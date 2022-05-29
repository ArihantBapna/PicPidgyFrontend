import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

// Screens
import Home from "./screens/Tabs/TabNavigator";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import {NativeBaseProvider} from "native-base/src/core/NativeBaseProvider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NativeBaseProvider>
          <NavigationContainer>
              <Stack.Navigator>
                  <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                  <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
                  <Stack.Screen name="Home" component={Home} options={{headerShown: false}}></Stack.Screen>
              </Stack.Navigator>
          </NavigationContainer>
      </NativeBaseProvider>
  );
}

