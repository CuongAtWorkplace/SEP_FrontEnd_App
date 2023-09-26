import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import home from './src/screen/homescreen/home';
import Login from './src/screen/login/login';
import register from './src/screen/register/register';
import community from './src/screen/homescreen/community';
import notification from './src/screen/homescreen/notification';
import setting from './src/screen/homescreen/setting';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [routeName, setRouteName] = useState('Home');

  const handleLogin = () => {
    setRouteName('Login');
  };

  const handleRegister = () => {
    setRouteName('Register');
  };

  const handleHome = () => {
    setRouteName('Home');
  };

  return (
    <NavigationContainer>
      {routeName === 'Home' ? (
        <Tab.Navigator initialRouteName="Home"

          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              height: 60,
              position: 'absolute',
              bottom: 16,
              right: 16,
              left: 16,
              borderRadius: 16
            }
          }}>
          <Tab.Screen
            name="Home"
            component={home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen name="Community"
            component={community}
            options={{
              tabBarLabel:'Community',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="language" size={size} color={color} />
              ),
            }}
          />
         
          <Tab.Screen name="Setting" 
          component={setting}
          options={{
            tabBarLabel:'settinng',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="settings" size={size} color={color} />
            ),
          }}
          />

        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={routeName}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false, // Bỏ header ở màn hình Login
            }}
          />
          <Stack.Screen
            name="Home"
            component={home}
            options={{
              headerShown: false, // Bỏ header ở màn hình Home
            }}
          />
          <Stack.Screen
            name="Register"
            component={register}
            options={{
              headerShown: false, // Bỏ header ở màn hình Register
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;