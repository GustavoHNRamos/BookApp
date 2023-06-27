import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import InitialScreen from "./screens/InitialScreen";
import BookDetailsScreen from "./screens/BookDetailsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={InitialScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BookDetails"
            component={BookDetailsScreen}
            options={{
              headerTitle: "Selected Book",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
