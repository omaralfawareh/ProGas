import { View, StyleSheet } from "react-native";
import Graph from "../components/Graph";
import BarChart from "../components/BarChart";
function Home() {
  return (
    <View style={style.container}>
      <Graph />
      <BarChart />
    </View>
  );
}
export default Home;
const style = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
