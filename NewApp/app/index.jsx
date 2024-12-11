import React, { useState } from 'react';
import axios, {isCancel, AxiosError} from 'axios';
import HomeScreen from "./HomeScreen";
import RideScreen from "./RideScreen";
import {NavigationContainer, NavigationIndependentTree} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
  <NavigationIndependentTree>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Log In" 
          component={HomeScreen}
        />
        <Stack.Screen
        name = "RideScreen"
        component={RideScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </NavigationIndependentTree>
  );
}

export default App;
