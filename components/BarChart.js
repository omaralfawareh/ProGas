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
        padding: 0,
        margin: 0,
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
          color: (opacity = 1) => {
            return theme === "light"
              ? `rgba(255, 255, 255, ${opacity})`
              : `rgba(0, 255, 0, ${opacity + 0.15})`;
          },
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        fromZero={true}
        style={{
          borderRadius: 16,
        }}
        showValuesOnTopOfBars
      />
    </View>
  );
}
export default BarChart;
