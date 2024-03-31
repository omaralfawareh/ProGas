import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login";
import SignUp from "./SignUp";
import { NativeBaseProvider } from "native-base";
import Drawer from "../components/Drawer";
import AuthContext from "../store/auth-context";

const Stack = createStackNavigator();

function Index() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx?.user);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <>
            {authCtx?.user ? (
              <Stack.Screen
                name="Drawer"
                component={Drawer}
                options={{ headerShown: false }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            )}
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
export default Index;
