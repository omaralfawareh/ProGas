import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import AuthContext from "../store/auth-context";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useTheme } from "../store/theme-context";
import { Button } from "native-base";
function Offers() {
  const authCtx = useContext(AuthContext);
  const { colors } = useTheme();
  const [userData, setUserData] = useState(null);
  const style = StyleSheet.create({
    container: {
      flex: 1,
      gap: 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    title: {
      color: colors.text,
      fontWeight: "bold",
      fontSize: 30,
      textAlign: "center",
    },
  });
  upgradeSub = async () => {
    if (authCtx.anonymous.isAnonymous) {
      authCtx?.signOut();
      authCtx.anonymous.setIsAnonymous(false);
      return;
    }
    try {
      const docRef = doc(db, "users", authCtx.user.uid);
      await setDoc(docRef, { subscription: "Premium" }, { merge: true });
      // Update local state after updating Firestore document
      setUserData((prevUserData) => ({
        ...prevUserData,
        subscription: "Premium",
      }));
      authCtx?.setUserData(userData);
      console.log("omar", authCtx?.userData);
    } catch (error) {
      console.log("Failed to upgrade subscription: ", error);
    }
  };
  useEffect(() => {
    if (!authCtx?.user) return;

    const fetchSub = async () => {
      const docRef = doc(db, "users", authCtx.user.uid);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
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
  if (userData?.subscription !== "Premium" || authCtx.anonymous.isAnonymous) {
    return (
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
    );
  }
  return (
    <View style={style.container}>
      <Text style={style.title}>Offers</Text>
    </View>
  );
}
export default Offers;
