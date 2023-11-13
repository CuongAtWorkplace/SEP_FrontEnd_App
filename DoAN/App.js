import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LogBox, StyleSheet } from 'react-native';
import { View } from 'react-native';
import Home from './src/screen/homescreen/home';
import Login from './src/screen/login/login';
import Register from './src/screen/register/register';
import Community from './src/screen/homescreen/community';
import Setting from './src/screen/homescreen/setting';
import ClassDetail from './src/screen/class/classDetail';
import profile from './src/screen/homescreen/profile'; 
import { MaterialIcons } from '@expo/vector-icons';
import updateProfile from './src/screen/homescreen/updateProfile';
import notification from './src/screen/homescreen/notification';
import classSearch from './src/screen/homescreen/classSearch';
import Chat from './src/screen/ChatRoom/Chat';
import CommentList from './src/screen/PostScreen/CommentList';
import OnboardingScreen from './src/screen/onBoarding/onBoardingScreen';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
  initialRouteName="Home" // Đặt màn hình mặc định ở đây
  tabBarOptions={{
    tabStyle: {
      padding: 5, // Khoảng cách từ biểu tượng đến biên trên của tab
    },
  }}
>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Community"
      component={Community}
      options={{
        tabBarLabel: 'Community',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="language" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Setting"
      component={Setting}
      options={{
        tabBarLabel: 'Setting',
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="settings" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

LogBox.ignoreAllLogs();//Ignore all log notifications


const App = () => {

  StatusBar.setHidden(false);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="ClassDetail" component={ClassDetail} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={profile} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateProfile" component={updateProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={notification} options={{ headerShown: false }} />
        <Stack.Screen name="ClassSearch" component={classSearch} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
