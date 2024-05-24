import { LineChart } from "react-native-chart-kit";
import { View, Text, Dimensions } from "react-native";

function Graph() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],

          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
              color: (opacity = 1) => `rgba(1, 1, 122, ${opacity})`, // Red color for the first dataset
            },
          ],
          legend: ["Actual", "Predicted"], // optional
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#4caf50", // Green main color
          backgroundGradientFrom: "#4caf50", // Green gradient start color
          backgroundGradientTo: "#81c784", // Green gradient end color
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 13,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "darkgreen",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
export default Graph;
