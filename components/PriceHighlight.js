import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "../store/theme-context";

function PriceHighlight({ dataType, price, trend }) {
  const { colors } = useTheme();
  const trendColor = trend === "up" ? "red" : "green"; // Use green for decreasing and red for increasing prices

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        {dataType} Prediction
      </Text>
      <Text style={[styles.price, { color: trendColor }]}>{price} JOD</Text>
      <Text style={[styles.trend, { color: trendColor }]}>
        {trend === "up" ? "▲" : "▼"}{" "}
        {trend === "up" ? "Increasing" : "Decreasing"}
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
