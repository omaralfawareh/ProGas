import { BarChart as Bar } from "react-native-chart-kit";
import { View, Dimensions } from "react-native";
import { useTheme } from "../store/theme-context";
import { color } from "@rneui/base";

function BarChart() {
  const { theme } = useTheme();

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
        yAxisLabel=""
        chartConfig={{
          backgroundColor: theme === "light" ? "#003e29" : "black",
          backgroundGradientFrom: theme === "light" ? "#003e29" : "black", // Green gradient start color
          backgroundGradientTo: theme === "light" ? "#81c784" : "black", // Green gradient end color
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 0.1) => `rgba(0, 255, 0,${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        fromZero={true}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        showValuesOnTopOfBars
      />
    </View>
  );
}
export default BarChart;
