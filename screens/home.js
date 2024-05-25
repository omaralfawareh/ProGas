import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import Graph from "../components/Graph";
import BarChart from "../components/BarChart";
import { useTheme } from "../store/theme-context";
import PriceHighlight from "../components/PriceHighlight";
import AuthContext from "../store/auth-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Avatar } from "@rneui/themed";

function Home() {
  const authCtx = useContext(AuthContext);
  const [dataType, setDataType] = useState("Gasoline");
  const { colors } = useTheme();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!authCtx?.user) return;

    const fetchSub = async () => {
      const docRef = doc(db, "users", authCtx.user.uid);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Failed to fetch user data ", error);
      }
    };
    fetchSub();
  }, [authCtx?.userData]);

  const handleButtonPress = (type) => {
    if (
      type !== "Gasoline" &&
      (userData?.subscription !== "Premium" || authCtx.anonymous.isAnonymous)
    ) {
      Alert.alert(
        "Upgrade Required",
        "Please upgrade to Premium subscription to access this feature."
      );
      return;
    }
    setDataType(type);
  };

  // Mock predicted prices and trends
  const predictedPrices = {
    Gasoline: { price: 1.2, trend: "up" },
    Diesel: { price: 1.1, trend: "down" },
    Gasoline95: { price: 0.9, trend: "up" },
  };

  const currentPrediction = predictedPrices[dataType];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    contentContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      padding: 10,
      paddingTop: 0,
    },
    button: {
      flexDirection: "row",
      justifyContent: "center",
      padding: 10,
      paddingHorizontal: 0,
      borderRadius: 20, // Make buttons rounded
      backgroundColor: "#3b3b3b",
      alignItems: "center",
      width: "30%",
      position: "relative", // Added for lock icon positioning
      opacity:
        userData?.subscription !== "Premium" || authCtx.anonymous.isAnonymous
          ? 0.5
          : 1,
    },
    activeButton: {
      backgroundColor: colors.button, // Active button color
      borderWidth: 0.9,
      borderColor: "white",
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
    lockIcon: {
      position: "absolute",
      left: 2,
    },
    priceHighlight: {
      marginTop: 10,
      marginBottom: 5,
      height: 80,
      justifyContent: "center",
      alignItems: "center",
    },
    fullOpacity: {
      opacity: 1,
    },
  });
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            dataType === "Gasoline" && styles.activeButton,
            styles.fullOpacity,
          ]}
          onPress={() => handleButtonPress("Gasoline")}
        >
          <Text style={styles.buttonText}>Gasoline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, dataType === "Diesel" && styles.activeButton]}
          onPress={() => handleButtonPress("Diesel")}
          // disabled={
          //   userData?.subscription !== "Premium" ||
          //   authCtx.anonymous.isAnonymous
          // }
        >
          {(userData?.subscription !== "Premium" ||
            authCtx.anonymous.isAnonymous) && (
            <Avatar
              size={30}
              rounded
              icon={{
                name: "lock",
                type: "material",
              }}
              containerStyle={styles.lockIcon}
            />
          )}
          <Text style={styles.buttonText}>Diesel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            dataType === "Gasoline95" && styles.activeButton,
          ]}
          onPress={() => handleButtonPress("Gasoline95")}
          // disabled={
          //   userData?.subscription !== "Premium" ||
          //   authCtx.anonymous.isAnonymous
          // }
        >
          {(userData?.subscription !== "Premium" ||
            authCtx.anonymous.isAnonymous) && (
            <Avatar
              size={30}
              rounded
              icon={{
                name: "lock",
                type: "material",
              }}
              containerStyle={styles.lockIcon}
            />
          )}
          <Text style={{ ...styles.buttonText, marginLeft: 10 }}>
            Gasoline 95
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.priceHighlight}>
        <PriceHighlight
          dataType={dataType}
          price={currentPrediction.price}
          trend={currentPrediction.trend}
        />
      </View>
      <Graph dataType={dataType} />
      <BarChart dataType={dataType} />
    </ScrollView>
  );
}

export default Home;
