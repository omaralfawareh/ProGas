import Profile from "../screens/profile";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/home";
function Drawer() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="login"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "white",
        },
        drawerLabelStyle: { color: "black", fontSize: 15 },
        headerStyle: {
          backgroundColor: "#4caf50",
        },
        headerTitleStyle: { color: "white" },
        drawerActiveTintColor: "#4caf50",
        drawerActiveBackgroundColor: "#4caf50",
      }}
    >
      <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
      <Drawer.Screen name="Profile" component={Profile}></Drawer.Screen>
    </Drawer.Navigator>
  );
}
export default Drawer;
