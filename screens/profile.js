import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { Button } from "native-base";
import AuthContext from "../store/auth-context";

function Profile() {
  const authCtx = useContext(AuthContext);

  return (
    <View>
      <Text style={style.text}>User Profile</Text>
      <Button
        style={style.button}
        colorScheme="success"
        onPress={authCtx.signOut}
      >
        Logout
      </Button>
    </View>
  );
}
export default Profile;
const style = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 50,
    textAlign: "center",
    color: "#4caf50",
    fontWeight: "bold",
  },
  inputField: {},
  button: {
    width: "100%",
  },
});
