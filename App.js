import 'react-native-gesture-handler'; // this should always be the first line no matter what!!
import React , { useState } from 'react';
// import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './MainScreen.js'; 
import CashFlowScreen from './CashFlowScreen.js';

const Stack = createStackNavigator();

// todo: remove header from main calculator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}/> 
        <Stack.Screen name="Cash Flow Table" component={CashFlowScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
