import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Avatar, BottomSheet, Card as RCard, Icon } from "@rneui/themed";
import { Input, Button } from "native-base";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Card from "../components/profile/Card";
function Profile() {
  const authCtx = useContext(AuthContext);
  const [isAccountVisible, setIsAcountVisible] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  function changePassword() {
    if (!authCtx?.user) return;
    sendPasswordResetEmail(auth, authCtx?.user?.email)
      .then(() => {
        console.log("SUCCESS");
      })
      .catch(() => {
        console.log("FAILED");
      });
  }
  return (
    <View style={style.container}>
      <View
        style={{
          ...style.container,
          alignItems: "center",
          flex: 0.6,
          justifyContent: "center",
          gap: 0,
        }}
      >
        <Avatar
          size={150}
          rounded
          source={{
            uri: "https://cdn-icons-png.freepik.com/512/147/147142.png?ga=GA1.1.1980490144.1701362827",
          }}
        ></Avatar>
        <Text style={{ ...style.title, fontSize: 25 }}>
          {authCtx?.user?.name || "Omar Alfawareh"}
        </Text>
        <Text style={{}}>{authCtx?.user?.email}</Text>
      </View>
      <View
        style={{
          width: "100%",
          // borderWidth: 2,
          //  borderColor: "red",
        }}
      >
        <Text style={{ ...style.title, fontSize: 20 }}>Settings</Text>
      </View>
      <Card
        text="Account Information"
        icon="person"
        color="black"
        onPress={() => setIsAcountVisible(true)}
      />
      <BottomSheet
        isVisible={isAccountVisible}
        onBackdropPress={() => setIsAcountVisible(false)}
        containerStyle={{
          borderWidth: 2,
          borderColor: "red",
        }}
      >
        <RCard containerStyle={style.card}>
          <Text style={{ ...style.title, marginBottom: 10, fontSize: 20 }}>
            Account Information
          </Text>
          <View style={{ gap: 10 }}>
            <Input
              size="lg"
              style={style.inputField}
              type="text"
              placeholder="Full Name"
              value={"Omar Alfawareh"}
              isReadOnly={true}
            />
            <Input
              size="lg"
              style={style.inputField}
              type="text"
              placeholder="Email"
              value={"alfawareho@gmail.com"}
              onChangeTex
              isReadOnly={true}
            />
            <Input
              size="lg"
              style={style.inputField}
              type="text"
              placeholder="Phone Number"
              value={"0791141046"}
              isReadOnly={true}
            />
          </View>
          <Text style={{ ...style.title, marginVertical: 10, fontSize: 20 }}>
            Subscription
          </Text>
          <View style={{ gap: 10 }}>
            <Input
              size="lg"
              style={style.inputField}
              type="text"
              placeholder="Full Name"
              value={"Basic Subscription"}
              isReadOnly={true}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Button
              borderRadius="full"
              colorScheme="success"
              onPress={() => setIsAcountVisible(false)}
              style={{ marginTop: 60, width: 55, height: 55 }}
            >
              <Icon name="close" type="material" />
            </Button>
          </View>
        </RCard>
      </BottomSheet>
      <Card
        text="Reset Password"
        icon="lock"
        color="black"
        onPress={() => setIsResetPassword(true)}
      />
      <BottomSheet
        isVisible={isResetPassword}
        onBackdropPress={() => setIsResetPassword(false)}
        containerStyle={{
          borderWidth: 2,
          borderColor: "red",
        }}
      >
        <RCard containerStyle={style.card}>
          <Text style={{ ...style.title, marginBottom: 10, fontSize: 20 }}>
            Reset Password
          </Text>
          <View style={{ gap: 10 }}>
            <Text>Press confirm to reset your password.</Text>
            <Text>An email will be sent to you.</Text>
            <Text>Follow the provided instructions in the email.</Text>
          </View>
          <View style={{ paddingVertical: 50 }}>
            <Button colorScheme="success" onPress={changePassword}>
              Confirm Password Reset
            </Button>
          </View>
          <View style={{ alignItems: "center" }}>
            <Button
              borderRadius="full"
              colorScheme="success"
              onPress={() => setIsResetPassword(false)}
              style={{ marginTop: 25, width: 55, height: 55 }}
            >
              <Icon name="close" type="material" />
            </Button>
          </View>
        </RCard>
      </BottomSheet>
      <Card text="FAQ" icon="help" color="black" />
      <Card
        text="Logout"
        icon="logout"
        onPress={authCtx.signOut}
        color="red"
        extraStyle={{ fontWeight: "bold" }}
      />
      {/* <Button
        style={style.button}
        colorScheme="success"
        onPress={authCtx.signOut}
      >
        Logout
      </Button> */}
    </View>
  );
}
export default Profile;
const style = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: "red",
    padding: 10,
    alignItems: "center",
    gap: 10,
  },
  button: {
    width: "100%",
  },
  title: { textAlign: "left", fontWeight: "bold" },
  card: {
    width: "100%",
    margin: "0",
    // paddingBottom: 200,
    borderRadius: 13,
    borderColor: "blue",
    padding: 10,
  },
  inputField: {
    backgroundColor: "white",
    borderRadius: 13,
    marginBottom: 10,
  },
});
