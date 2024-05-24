import { Card as RCard } from "@rneui/themed";
import { Avatar } from "@rneui/themed";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function Card(props) {
  const { text, icon, onPress, color, extraStyle } = props;
  return (
    <TouchableOpacity style={{ width: "100%" }} onPress={onPress}>
      <RCard
        containerStyle={[style.card, { borderColor: "transparent" }]}
        rounded
      >
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Avatar
            size={35}
            rounded
            icon={{
              name: icon,
              type: "material",
            }}
            containerStyle={{ backgroundColor: "#003e29" }}
          />
          <Text
            style={{
              fontSize: 15,
              color: color,
              ...extraStyle,
            }}
          >
            {text}
          </Text>
        </View>
      </RCard>
    </TouchableOpacity>
  );
}
export default Card;
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
    margin: "0",
    backgroundColor: "black",
  },
});
