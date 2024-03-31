import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { Input, Button } from "native-base";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        <Button style={style.button} colorScheme="success">
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
