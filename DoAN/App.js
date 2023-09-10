// App.js
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screen/login/login';
import React, { useState } from 'react';

function App() {
  return (
    <Login/>
  );
}

export default App;
