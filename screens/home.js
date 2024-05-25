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
  // const [jsonData, setJsonData] = useState(null);
  const [jsonData, setJsonData] = useState({
    Actual_Months: [
      {
        Date: "Sep-23",
        Diesel: 823.331298828125,
        "Gasoline-90": 934.509460449219,
        "Gasoline-95": 1210.13659667969,
      },
      {
        Date: "Oct-23",
        Diesel: 848.234741210938,
        "Gasoline-90": 950.281188964844,
        "Gasoline-95": 1224.47607421875,
      },
      {
        Date: "Nov-23",
        Diesel: 879.524047851563,
        "Gasoline-90": 993.26171875,
        "Gasoline-95": 1253.068359375,
      },
      {
        Date: "Dec-23",
        Diesel: 876.635009765625,
        "Gasoline-90": 990.549438476563,
        "Gasoline-95": 1249.71643066406,
      },
      {
        Date: "Jan-24",
        Diesel: 877.251708984375,
        "Gasoline-90": 988.870239257813,
        "Gasoline-95": 1248.7333984375,
      },
      {
        Date: "Feb-24",
        Diesel: 879.464538574219,
        "Gasoline-90": 986.516906738281,
        "Gasoline-95": 1245.19848632813,
      },
      {
        Date: "Mar-24",
        Diesel: 843.511535644531,
        "Gasoline-90": 953.379638671875,
        "Gasoline-95": 1236.28393554688,
      },
      {
        Date: "Apr-24",
        Diesel: 842.487609863281,
        "Gasoline-90": 952.099914550781,
        "Gasoline-95": 1234.16638183594,
      },
      {
        Date: "May-24",
        Diesel: 876.16015625,
        "Gasoline-90": 979.488159179688,
        "Gasoline-95": 1244.548828125,
      },
    ],
    Next_Month: {
      Date: "Jun-24",
      Diesel: 829.147033691406,
      "Gasoline-90": 939.050231933594,
      "Gasoline-95": 1217.2578125,
    },
    Previous_Months: [
      {
        Date: "Sep-23",
        Diesel: 800,
        "Gasoline-90": 960,
        "Gasoline-95": 1205,
      },
      {
        Date: "Oct-23",
        Diesel: 825,
        "Gasoline-90": 975,
        "Gasoline-95": 1220,
      },
      {
        Date: "Nov-23",
        Diesel: 795,
        "Gasoline-90": 925,
        "Gasoline-95": 1165,
      },
      {
        Date: "Dec-23",
        Diesel: 750,
        "Gasoline-90": 915,
        "Gasoline-95": 1160,
      },
      {
        Date: "Jan-24",
        Diesel: 720,
        "Gasoline-90": 895,
        "Gasoline-95": 1130,
      },
      {
        Date: "Feb-24",
        Diesel: 720,
        "Gasoline-90": 910,
        "Gasoline-95": 1150,
      },
      {
        Date: "Mar-24",
        Diesel: 740,
        "Gasoline-90": 930,
        "Gasoline-95": 1170,
      },
      {
        Date: "Apr-24",
        Diesel: 730,
        "Gasoline-90": 940,
        "Gasoline-95": 1175,
      },
      {
        Date: "May-24",
        Diesel: 735,
        "Gasoline-90": 960,
        "Gasoline-95": 1200,
      },
    ],
  });

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

    // Fetch JSON data from localhost
    // fetch("http://localhost:3000/data") // Adjust URL accordingly
    //   .then((response) => response.json())
    //   .then((data) => setJsonData(data))
    //   .catch((error) => console.error("Error fetching data:", error));
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

  // const predictedPrices = {
  //   Gasoline: { price: 1.2, trend: "up" },
  //   Diesel: { price: 1.1, trend: "down" },
  //   Gasoline95: { price: 0.9, trend: "up" },
  // };

  // const currentPrediction = predictedPrices[dataType];

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
      borderRadius: 20,
      backgroundColor: "#3b3b3b",
      alignItems: "center",
      width: "30%",
      position: "relative",
      opacity:
        userData?.subscription !== "Premium" || authCtx.anonymous.isAnonymous
          ? 0.5
          : 1,
    },
    activeButton: {
      backgroundColor: colors.button,
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
          // price={currentPrediction.price}
          // trend={currentPrediction.trend}
          Data={jsonData}
        />
      </View>
      <Graph dataType={dataType} Data={jsonData} />
      <BarChart dataType={dataType} Data={jsonData} />
    </ScrollView>
  );
}

export default Home;
