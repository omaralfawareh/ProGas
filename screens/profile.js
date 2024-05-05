import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { Button } from "native-base";
import AuthContext from "../store/auth-context";
import { Card } from "@rneui/themed";
import { Avatar } from "@rneui/themed";
function Profile() {
  const authCtx = useContext(AuthContext);

  return (
    <View style={style.container}>
      <View
        style={{
          ...style.container,
          alignItems: "center",
          flex: 0.6,
          justifyContent: "center",
        }}
      >
        <Avatar
          size={150}
          rounded
          source={{
            uri: "https://cdn-icons-png.freepik.com/512/147/147142.png?ga=GA1.1.1980490144.1701362827",
          }}
        ></Avatar>
        <Text style={{ fontSize: 20 }}>Omar Alfawareh</Text>
      </View>
      <Card containerStyle={style.card} rounded>
        <Card.Title style={style.title}> This is a test Card</Card.Title>
        <Card.Divider />
        <Text>Omar is the best</Text>
      </Card>
      <Card containerStyle={style.card}>
        <Card.Title style={style.title}> This is a test Card</Card.Title>
        <Card.Divider />
        <Text>Omar is the best</Text>
      </Card>
      <Button
        style={style.button}
        colorScheme="success"
        onPress={authCtx.signOut}
      >
        Logout
      </Button>
    </View>
  );
}
export default Profile;
const style = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: "red",
    padding: 10,
    alignItems: "center",
    gap: 15,
  },
  inputField: {},
  button: {
    width: "100%",
  },
  title: { textAlign: "left" },
  card: { borderRadius: 13, width: "100%", margin: "0" },
});
