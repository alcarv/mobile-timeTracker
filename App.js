import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from './view/auth/Login';
import ConsumerHomeComponent from './view/Consumer/Home';
import EstabelecimentoHomeComponent from './view/Estabelecimento/Home';
import EstabelecimentosPorTipo from './view/Consumer/EstabelecimentosPorTipo';
import { Provider } from 'react-redux';

import configureStore from './redux/store'

const Stack = createStackNavigator();
const store = configureStore();

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name=" " component={LoginComponent} />
          <Stack.Screen name="ConsumerHome" component={ConsumerHomeComponent} />
          <Stack.Screen name="PorTipo" component={EstabelecimentosPorTipo} />
          <Stack.Screen name="EstabelecimentoHome" component={EstabelecimentoHomeComponent} />
        </Stack.Navigator> 
      </NavigationContainer>
    </Provider>
  );
} 


