import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useTheme } from "../store/theme-context";

function Graph({ Data, dataType }) {
  const { theme, colors } = useTheme();

  const dataKey =
    dataType === "Gasoline"
      ? "Gasoline-90"
      : dataType === "Diesel"
      ? "Diesel"
      : "Gasoline-95";

  const labels = Data.Actual_Months.slice(-6).map(
    (monthData) => monthData.Date
  );

  const actualData = Data.Actual_Months.slice(-6).map((monthData) => {
    return monthData[dataKey] / 1000;
  });

  const previousData = Data.Previous_Months.slice(-6).map((monthData) => {
    return monthData[dataKey] / 1000;
  });

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 20,
      }}
    >
      <LineChart
        data={{
          labels: labels,

          datasets: [
            {
              data: actualData,
            },
            {
              data: previousData,
              color: () => {
                return theme === "light" ? "black" : "#003e29";
              },
            },
          ],
          legend: ["Actual", "Predicted"],
        }}
        width={Dimensions.get("window").width - 20}
        height={220}
        yAxisLabel="JOD"
        yAxisInterval={0.5}
        chartConfig={{
          backgroundColor: colors.graphBackground,
          backgroundGradientFrom: colors.graphBackground,
          backgroundGradientTo: theme === "light" ? "#81c784" : "black",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 13,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#5cb25d",
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

export default Graph;
