import { BarChart as Bar } from "react-native-chart-kit";
import { View, Dimensions } from "react-native";

function BarChart() {
  const data = {
    labels: ["Gasoline", "Diesel", "Natural Gas"],
    datasets: [
      {
        data: [120, 110, 135],
      },
    ],
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      <Bar
        data={data}
        width={Dimensions.get("window").width - 20}
        height={250}
        yAxisLabel="$"
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
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
export default BarChart;
