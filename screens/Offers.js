import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import AuthContext from "../store/auth-context";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useTheme } from "../store/theme-context";
import { Button } from "native-base";

function Offers() {
  const authCtx = useContext(AuthContext);
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
  }, []);

  const upgradeSub = async () => {
    if (authCtx.anonymous.isAnonymous) {
      authCtx?.signOut();
      authCtx.anonymous.setIsAnonymous(false);
      return;
    }
    try {
      const docRef = doc(db, "users", authCtx.user.uid);
      await setDoc(docRef, { subscription: "Premium" }, { merge: true });
      setUserData((prevUserData) => ({
        ...prevUserData,
        subscription: "Premium",
      }));
      authCtx?.setUserData(userData);
    } catch (error) {
      console.log("Failed to upgrade subscription: ", error);
    }
  };

  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    title: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 30,
      marginBottom: 20,
    },
    offerCard: {
      backgroundColor: colors.card,
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    logoContainer: {
      width: 80,
      height: 80,
      borderRadius: 40, // Make it round
      overflow: "hidden", // Clip the image to the rounded border
      marginRight: 10, // Add some margin for spacing
      marginBottom: 8,
    },
    logo: {
      width: "100%",
      height: "100%",
      resizeMode: "stretch", // Fill the container while maintaining aspect ratio
    },
    voucherButton: {
      backgroundColor: "#5cb25d",
      padding: 10,
      borderRadius: 5,
    },
    voucherText: {
      color: colors.text,
      fontWeight: "bold",
      textAlign: "center",
    },
    offerText: {
      color: colors.text,
      fontWeight: "bold",
      flex: 1, // Allow text to take up remaining space
    },
  });

  const offers = [
    {
      id: 1,
      companyName: "Manaseer Gas Station",
      product: "Gasoline 90",
      logo: require("../assets/manaseer.jpg"),
      voucher: "MANA90",
      text: "Get 10% off on your next refill.",
    },
    {
      id: 2,
      companyName: "Manaseer Gas Station",
      product: "Diesel",
      logo: require("../assets/joPetrol.jpg"),
      voucher: "MANADIE",
      text: "Special discount for Diesel purchases!",
    },
    {
      id: 3,
      companyName: "Total",
      product: "Gasoline 95",
      logo: require("../assets/total.png"),
      voucher: "TOT95",
      text: "Exclusive offer on Gasoline 95!",
    },
  ];

  return (
    <View style={style.container}>
      <Text style={style.title}>Offers</Text>
      {userData?.subscription !== "Premium" || authCtx.anonymous.isAnonymous ? (
        <View style={style.container}>
          <Text style={style.title}>Upgrade to Premium</Text>
          <Button
            style={{
              backgroundColor: "#5cb25d",
            }}
            onPress={upgradeSub}
          >
            Upgrade to Premium
          </Button>
        </View>
      ) : (
        offers.map((offer) => (
          <View key={offer.id} style={style.offerCard}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={style.logoContainer}>
                <Image source={offer.logo} style={style.logo} />
              </View>
              <Text style={style.offerText}>{offer.text}</Text>
            </View>
            <TouchableOpacity
              style={style.voucherButton}
              onPress={() => alert(`Voucher Code: ${offer.voucher}`)}
            >
              <Text style={{ ...style.voucherText, color: "white" }}>
                Reveal Voucher
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );
}

export default Offers;
