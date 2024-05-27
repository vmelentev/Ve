import 'expo-dev-client';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/mainScreen.js';
import Cam from './screens/camScreen.js';
import Desc from './screens/descScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name='Main' component={Main}/>
        <Stack.Screen name='Cam' component={Cam}/>
        <Stack.Screen name='Desc' component={Desc}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
