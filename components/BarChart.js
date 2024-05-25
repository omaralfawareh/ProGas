import React from "react";
import { View, Dimensions } from "react-native";
import { BarChart as Bar } from "react-native-chart-kit";
import { useTheme } from "../store/theme-context";

function BarChart({ Data }) {
  const { theme } = useTheme();

  const recentGasolinePrice = (
    Data.Actual_Months.slice(-1)[0]["Gasoline-95"] / 1000
  ).toFixed(3);
  const recentDieselPrice = (
    Data.Actual_Months.slice(-1)[0]["Diesel"] / 1000
  ).toFixed(3);
  const recentGasoline90Price = (
    Data.Actual_Months.slice(-1)[0]["Gasoline-90"] / 1000
  ).toFixed(3);

  const data = {
    labels: ["Gasoline", "Diesel", "Gasoline 95"],
    datasets: [
      {
        data: [recentGasoline90Price, recentDieselPrice, recentGasolinePrice],
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
        yAxisLabel="JOD"
        chartConfig={{
          backgroundColor: theme === "light" ? "#003e29" : "black",
          backgroundGradientFrom: theme === "light" ? "#003e29" : "black",
          backgroundGradientTo: theme === "light" ? "#81c784" : "black",
          decimalPlaces: 3,
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
