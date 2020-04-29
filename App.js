import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from './view/auth/Login';
import ConsumerHomeComponent from './view/Consumer/Home';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name=" " component={LoginComponent} />
        <Stack.Screen name="ConsumerHome" component={ConsumerHomeComponent} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
} 


