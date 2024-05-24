import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Graph from "../components/Graph";
import BarChart from "../components/BarChart";
import { useTheme } from "../store/theme-context";
function Home() {
  const [dataType, setDataType] = useState("Gasoline");
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
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
      backgroundColor: "#bcbdbc",
      alignItems: "center",
      width: "30%",
    },
    activeButton: {
      backgroundColor: colors.button, // Active button color
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
  });
  return (
    <View style={styles.container}>
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
          onPress={() => setDataType("Natural Gas")}
        >
          <Text style={styles.buttonText}>Natural Gas</Text>
        </TouchableOpacity>
      </View>
      <Graph dataType={dataType} />
      <BarChart dataType={dataType} />
    </View>
  );
}

export default Home;
