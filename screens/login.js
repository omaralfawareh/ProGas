import { View, Text, StyleSheet, TextInput } from "react-native";
import { useState, useContext } from "react";
import { Input, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../store/auth-context";

function Login() {
  const [email, setEmail] = useState("omar@gmail.com");
  const [password, setPassword] = useState("password");
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  return (
    <View style={style.inputContainer}>
      <Text style={style.text}>Login</Text>
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
        <Button
          style={style.button}
          colorScheme="success"
          onPress={() => {
            authCtx.login(email, password);
            // navigation.navigate("Drawer", { screen: "Profile" });
          }}
        >
          Login
        </Button>
      </View>
      <View style={style.inputFieldContainer}>
        <Button
          style={style.button}
          colorScheme="success"
          variant="outline"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          SignUp
        </Button>
      </View>
    </View>
  );
}
export default Login;

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
    marginBottom: 7,
  },
  inputField: {},
  button: {
    width: "100%",
  },
});
