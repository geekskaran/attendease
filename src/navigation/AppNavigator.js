import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import Dashboard from '../screens/DashboardScreen';
import Classes from '../screens/ClassesScreen';
import Reports from '../screens/ReportScreen';
import TakeAttendanceScreen from '../screens/Takeattendance';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="MainApp" component={TabNavigator} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Classes" component={Classes} />
        <Stack.Screen name="Reports" component={Reports} />
        <Stack.Screen name="TakeAttendance" component={TakeAttendanceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 