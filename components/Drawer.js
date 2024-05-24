import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home";
import OffersPage from "../screens/Offers";
import Profile from "../screens/profile";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../store/theme-context";

const Tab = createBottomTabNavigator();

function Drawer() {
  const { theme, colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Offers") {
            iconName = "pricetag-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4caf50",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: colors.card,
        },
        headerStyle: {
          backgroundColor: theme === "light" ? "#5cb25d" : "black",
        },
        headerTitleStyle: { color: "white" },
      })}
    >
      <Tab.Screen name="Offers" component={OffersPage} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default Drawer;
