import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Avatar, BottomSheet, Card as RCard, Icon } from "@rneui/themed";
import { Input, Button } from "native-base";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Card from "../components/profile/Card";
import { useTheme } from "../store/theme-context";

function Profile() {
  const authCtx = useContext(AuthContext);
  const [isAccountVisible, setIsAcountVisible] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { colors } = useTheme();

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

  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.background,
    },
    button: {
      width: "100%",
    },
    title: { color: colors.text, textAlign: "left", fontWeight: "bold" },
    card: {
      width: "100%",
      margin: "0",
      borderRadius: 13,
      padding: 10,
      backgroundColor: colors.background,
    },
    inputField: {
      backgroundColor: colors.card,
      borderColor: "transparent",
      borderWidth: 0,
      color: colors.text,
      borderRadius: 13,
      marginBottom: 10,
    },
  });
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
        <Text style={{ ...style.title, fontSize: 25, marginTop: 10 }}>
          {authCtx?.anonymous.isAnonymous
            ? "Anonymous User"
            : authCtx?.user
            ? authCtx?.user?.name
            : ""}
        </Text>
        <Text style={{ color: colors.text }}>{authCtx?.user?.email}</Text>
      </View>
      <View
        style={{
          width: "100%",
        }}
      ></View>
      <Card
        text="Account Information"
        icon="person"
        color={colors.text}
        onPress={() => setIsAcountVisible(true)}
      />
      <BottomSheet
        isVisible={isAccountVisible}
        onBackdropPress={() => setIsAcountVisible(false)}
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
              // colorScheme="success"
              onPress={() => setIsAcountVisible(false)}
              style={{
                marginTop: 55,
                width: 55,
                height: 55,
                backgroundColor: "#003e29",
              }}
            >
              <Icon name="close" type="material" />
            </Button>
          </View>
        </RCard>
      </BottomSheet>
      <Card
        text="Reset Password"
        icon="lock"
        color={colors.text}
        onPress={() => setIsResetPassword(true)}
      />
      <BottomSheet
        isVisible={isResetPassword}
        onBackdropPress={() => setIsResetPassword(false)}
        containerStyle={{}}
      >
        <RCard containerStyle={style.card}>
          <Text style={{ ...style.title, marginBottom: 10, fontSize: 20 }}>
            Reset Password
          </Text>
          <View style={{ gap: 10 }}>
            <Text style={{ color: colors.text }}>
              Press confirm to reset your password.
            </Text>
            <Text style={{ color: colors.text }}>
              An email will be sent to you.
            </Text>
            <Text style={{ color: colors.text }}>
              Follow the provided instructions in the email.
            </Text>
          </View>
          <View style={{ paddingVertical: 50 }}>
            <Button
              colorScheme="success"
              style={{ backgroundColor: "#003e29" }}
              onPress={changePassword}
            >
              Confirm Password Reset
            </Button>
          </View>
          <View style={{ alignItems: "center" }}>
            <Button
              borderRadius="full"
              colorScheme="success"
              onPress={() => setIsResetPassword(false)}
              style={{
                marginTop: 125,
                width: 55,
                height: 55,
                backgroundColor: "#003e29",
              }}
            >
              <Icon name="close" type="material" />
            </Button>
          </View>
        </RCard>
      </BottomSheet>
      <Card text="FAQ" icon="help" color={colors.text} />
      <Card
        text="Logout"
        icon="logout"
        onPress={() => {
          authCtx?.signOut();
          authCtx.anonymous.setIsAnonymous(false);
        }}
        color="red"
        extraStyle={{ fontWeight: "bold" }}
      />
    </View>
  );
}
export default Profile;
