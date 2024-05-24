import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import Graph from "../components/Graph";
import BarChart from "../components/BarChart";
import { useTheme } from "../store/theme-context";
import PriceHighlight from "../components/PriceHighlight";

function Home() {
  const [dataType, setDataType] = useState("Gasoline");
  const { colors } = useTheme();

  // Mock predicted prices and trends
  const predictedPrices = {
    Gasoline: { price: 1.2, trend: "up" },
    Diesel: { price: 1.1, trend: "down" },
    NaturalGas: { price: 0.9, trend: "up" },
  };

  const currentPrediction = predictedPrices[dataType];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    contentContainer: {
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 20,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      padding: 10,
      paddingTop: 0,
    },
    button: {
      padding: 10,
      borderRadius: 20, // Make buttons rounded
      backgroundColor: "#3b3b3b",
      alignItems: "center",
      width: "30%",
    },
    activeButton: {
      backgroundColor: colors.button, // Active button color
      borderWidth: 0.9,
      borderColor: "white",
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
    priceHighlight: {
      marginTop: 10,
      marginBottom: 5,
      height: 80,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            dataType === "Gasoline" && styles.activeButton,
          ]}
          onPress={() => setDataType("Gasoline")}
        >
          <Text style={styles.buttonText}>Gasoline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, dataType === "Diesel" && styles.activeButton]}
          onPress={() => setDataType("Diesel")}
        >
          <Text style={styles.buttonText}>Diesel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            dataType === "Natural Gas" && styles.activeButton,
          ]}
          onPress={() => setDataType("NaturalGas")}
        >
          <Text style={styles.buttonText}>Natural Gas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.priceHighlight}>
        <PriceHighlight
          dataType={dataType}
          price={currentPrediction.price}
          trend={currentPrediction.trend}
        />
      </View>
      <Graph dataType={dataType} />
      <BarChart dataType={dataType} />
    </ScrollView>
  );
}

export default Home;
