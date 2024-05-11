import { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import AuthContext from "../store/auth-context";

function Offers() {
  const authCtx = useContext(AuthContext);
  if (authCtx.anonymous.isAnonymous) {
    return (
      <View style={style.container}>
        <Text style={style.title}>Login in to receive Offers</Text>
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
const style = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  title: { fontWeight: "bold", fontSize: 30, textAlign: "center" },
});
