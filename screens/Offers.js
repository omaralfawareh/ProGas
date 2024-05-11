import { View, StyleSheet, Text } from "react-native";
function Offers() {
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
