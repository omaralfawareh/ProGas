import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Input, Button } from "native-base";
import { signUpWithEmail as signUp } from "../auth-util";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function validatePassword() {
    return true;
  }
  function validateEmail() {
    return true;
  }
  function handleSignUp() {
    if (validatePassword() && validateEmail()) {
      signUp(email, password)
        .then(() => {
          console.log("SignUp Successful");
        })
        .catch(() => {
          console.log("SignUp Failed");
        });
    }
  }
  return (
    <View style={style.inputContainer}>
      <Text style={style.text}>SignUp</Text>
      <View style={style.inputFieldContainer}>
        <Input
          style={style.inputField}
          type="text"
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></Input>
      </View>
      <View style={style.inputFieldContainer}>
        <Input
          style={style.inputField}
          type="password"
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></Input>
      </View>
      <View style={style.inputFieldContainer}>
        <Input
          style={style.inputField}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        ></Input>
      </View>
      <View style={style.inputFieldContainer}>
        <Button
          style={style.button}
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

const style = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  inputField: {},
  button: {
    width: "100%",
  },
});
