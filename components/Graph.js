import { LineChart } from "react-native-chart-kit";
import { View, Dimensions } from "react-native";
import { useTheme } from "../store/theme-context";

function Graph() {
  const { theme, colors } = useTheme();

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
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],

          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
              color: () => {
                return theme === "light" ? "black" : "#003e29";
              },
            },
          ],
          legend: ["Actual", "Predicted"], // optional
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        yAxisLabel="JOD"
        // yAxisSuffix="k"
        yAxisInterval={0.5} // optional, defaults to 1
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
