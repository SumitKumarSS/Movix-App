import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./screen/HomeScreen";
import MovieScreen from "./screen/MovieScreen";
import PersonScreen from "./screen/PersonScreen";
import SearchScreen from "./screen/SearchScreen";
import MovieListScreen from "./screen/MovieListScreen";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Movie"
          options={{
            headerShown: false,
          }}
          component={MovieScreen}
        />
        <Stack.Screen
          name="Person"
          options={{
            headerShown: false,
          }}
          component={PersonScreen}
        />
        <Stack.Screen
          name="Search"
          options={{
            headerShown: false,
          }}
          component={SearchScreen}
        />
        <Stack.Screen
          name="MovieList"
          options={{
            headerShown: false,
          }}
          component={MovieListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
