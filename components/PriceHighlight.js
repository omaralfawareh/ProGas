import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "../store/theme-context";

function PriceHighlight({ Data, dataType }) {
  const { colors } = useTheme();

  // Determine the data key based on the data type
  const dataKey =
    dataType === "Gasoline"
      ? "Gasoline-90"
      : dataType === "Diesel"
      ? "Diesel"
      : "Gasoline-95";

  // Extract the most recent actual price for the specified data type
  const recentPrice = Data.Actual_Months.slice(-1)[0][dataKey];

  // Extract the next month's prediction for the specified data type
  const nextMonthPrediction = Data.Next_Month[dataKey];

  // Calculate the trend based on the comparison
  const trend = nextMonthPrediction > recentPrice ? "up" : "down";

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        {dataType} Prediction
      </Text>
      <Text style={[styles.price, { color: trend === "up" ? "red" : "green" }]}>
        {(nextMonthPrediction / 1000).toFixed(5)} JOD
      </Text>
      <Text style={[styles.trend, { color: trend === "up" ? "red" : "green" }]}>
        {trend === "up" ? "▲ Increasing" : "▼ Decreasing"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    width: Dimensions.get("window").width - 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 13,
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  trend: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default PriceHighlight;
