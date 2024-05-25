import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, BottomSheet, Card as RCard, Icon } from "@rneui/themed";
import { Input, Button, Switch } from "native-base";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Card from "../components/profile/Card";
import AuthContext from "../store/auth-context";
import { useTheme } from "../store/theme-context";

function Profile() {
  const authCtx = useContext(AuthContext);
  const [isAccountVisible, setIsAcountVisible] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { colors, theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingTop: 20,
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
    themeToggleContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: 5,
    },
    themeToggleText: {
      color: colors.text,
      fontSize: 18,
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          ...styles.container,
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
        />
        <Text style={{ ...styles.title, fontSize: 25, marginTop: 10 }}>
          {authCtx?.anonymous.isAnonymous
            ? "Anonymous User"
            : authCtx?.user
            ? authCtx?.user?.name
            : ""}
        </Text>
        <Text style={{ color: colors.text }}>{authCtx?.user?.email}</Text>
      </View>
      <View style={{ flex: 1, width: "100%", gap: 10, margin: 0 }}>
        <Card
          text="Dark Mode"
          icon={isDarkTheme ? "dark-mode" : "light-mode"}
          color={colors.text}
        />
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
          <RCard containerStyle={styles.card}>
            <Text style={{ ...styles.title, marginBottom: 10, fontSize: 20 }}>
              Account Information
            </Text>
            <View style={{ gap: 10 }}>
              <Input
                size="lg"
                style={styles.inputField}
                type="text"
                placeholder="Full Name"
                value={"Omar Alfawareh"}
                isReadOnly={true}
              />
              <Input
                size="lg"
                style={styles.inputField}
                type="text"
                placeholder="Email"
                value={"alfawareho@gmail.com"}
                isReadOnly={true}
              />
              <Input
                size="lg"
                style={styles.inputField}
                type="text"
                placeholder="Phone Number"
                value={"0791141046"}
                isReadOnly={true}
              />
            </View>
            <Text style={{ ...styles.title, marginVertical: 10, fontSize: 20 }}>
              Subscription
            </Text>
            <View style={{ gap: 10 }}>
              <Input
                size="lg"
                style={styles.inputField}
                type="text"
                placeholder="Full Name"
                value={"Basic Subscription"}
                isReadOnly={true}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Button
                borderRadius="full"
                onPress={() => setIsAcountVisible(false)}
                style={{
                  marginTop: 55,
                  width: 55,
                  height: 55,
                  backgroundColor: theme === "light" ? "#5cb25d" : "#003e29",
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
        >
          <RCard containerStyle={styles.card}>
            <Text style={{ ...styles.title, marginBottom: 10, fontSize: 20 }}>
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
                style={{
                  backgroundColor: theme === "light" ? "#5cb25d" : "#003e29",
                }}
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
                  backgroundColor: theme === "light" ? "#5cb25d" : "#003e29",
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
    </ScrollView>
  );
}

export default Profile;
