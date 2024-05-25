import { Card as RCard } from "@rneui/themed";
import { Avatar } from "@rneui/themed";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../store/theme-context";
import { Switch } from "native-base";
function Card(props) {
  const { text, icon, onPress, color, extraStyle } = props;
  const { colors, theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      gap: 10,
    },
    inputField: {},
    button: {
      width: "100%",
    },
    title: { textAlign: "left", fontWeight: "bold" },
    card: {
      borderRadius: 8,
      width: "100%",
      margin: 0,
      backgroundColor: colors.card,
    },
  });

  const handlePress = () => {
    if (text === "Dark Mode") {
      toggleTheme();
    } else {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={{ width: "100%" }} onPress={handlePress}>
      <RCard
        containerStyle={[style.card, { borderColor: "transparent" }]}
        rounded
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Avatar
            size={35}
            rounded
            icon={{
              name: icon,
              type: "material",
            }}
            containerStyle={{
              backgroundColor: "#5cb25d",
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: color,
                ...extraStyle,
                justifySelf: "start",
              }}
            >
              {text}
            </Text>
            {text === "Dark Mode" && (
              <Switch
                style={{ height: 35 }}
                value={isDarkTheme}
                onToggle={toggleTheme}
                offTrackColor="#767577"
                onTrackColor="#81b0ff"
                thumbColor={isDarkTheme ? "#5cb25d" : "#f4f3f4"}
              />
            )}
          </View>
        </View>
      </RCard>
    </TouchableOpacity>
  );
}
export default Card;
