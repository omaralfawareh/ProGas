import {
  LineChart,
  BarChart as Bar,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { View, Dimensions } from "react-native";

function BarChart() {
  const data = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        data: [20, 45, 28],
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
