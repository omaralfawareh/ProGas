import { View, Text, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { Input, Button } from "native-base";
import { signUpWithEmail as signUp } from "../auth-util";
import { useTheme } from "../store/theme-context";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { colors } = useTheme();

  function validatePassword() {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password) && password === confirmPassword;
  }

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleSignUp() {
    if (!validateEmail()) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
    } else if (!validatePassword()) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and match the confirmation password."
      );
    } else {
      signUp(email, password)
        .then(() => {
          console.log("SignUp Successful");
        })
        .catch(() => {
          console.log("SignUp Failed");
        });
    }
  }

  const styles = StyleSheet.create({
    inputContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.card,
    },
    text: {
      fontSize: 30,
      marginBottom: 50,
      textAlign: "center",
      color: "#4caf50",
      fontWeight: "bold",
    },
    inputFieldContainer: {
      alignItems: "center",
      width: "80%",
      marginBottom: 15,
    },
    inputField: {
      color: colors.text,
      backgroundColor: colors.background,
    },
    button: {
      width: "100%",
    },
  });

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.text}>SignUp</Text>
      <View style={styles.inputFieldContainer}>
        <Input
          style={styles.inputField}
          type="text"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></Input>
      </View>
      <View style={styles.inputFieldContainer}>
        <Input
          style={styles.inputField}
          type="password"
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></Input>
      </View>
      <View style={styles.inputFieldContainer}>
        <Input
          style={styles.inputField}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        ></Input>
      </View>
      <View style={styles.inputFieldContainer}>
        <Button
          style={styles.button}
          colorScheme="success"
          onPress={handleSignUp}
        >
          SignUp
        </Button>
      </View>
    </View>
  );
}

export default SignUp;
