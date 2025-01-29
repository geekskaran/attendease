// AuthScreen.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';

const AuthScreen = () => {
  const navigation = useNavigation();

  const handleSignup = () => {
    try {
      console.log('Attempting to navigate to Signup');
      navigation.navigate('Signup');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleLogin = () => {
    try {
      console.log('Attempting to navigate to Login');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Decorative Elements */}
      <View className="absolute w-full h-full">
        <View className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-100/50" />
        <View className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-blue-200/50" />
        <View className="absolute top-1/4 right-20 w-24 h-24 rounded-full bg-blue-300/50" />
      </View>

      <View className="flex-1 px-6">
        <View className="flex-1 justify-center items-center">
          {/* Logo Section */}
          <View className="w-32 h-32 items-center justify-center mb-8">
            <View className="absolute w-full h-full rounded-xl bg-blue-400/20 rotate-45" />
            <View className="absolute w-20 h-20 rounded-lg bg-blue-500/20 -rotate-45" />
            <View className="w-10 h-10 rounded-md bg-blue-600 items-center justify-center">
              <CustomText className="text-white text-2xl font-bold">A</CustomText>
            </View>
          </View>

          {/* Text Section */}
          <CustomText className="text-black text-4xl font-bold tracking-wider text-center">
            Welcome to AttendEase
          </CustomText>
          
          <CustomText className="text-gray-700 text-xl mt-4 text-center px-4 tracking-wide">
            Smart Attendance Management Solution
          </CustomText>

          <CustomText className="text-gray-600 text-base mt-6 text-center px-8">
            Track attendance effortlessly with our automated system
          </CustomText>
        </View>

        {/* Buttons Section */}
        <View className="mb-12 px-4">
          <TouchableOpacity
            className="bg-blue-600 rounded-xl py-4 mb-4 shadow-lg"
            onPress={handleSignup}
            activeOpacity={0.7}
          >
            <CustomText className="text-white text-center text-lg font-semibold tracking-wide">
              Get Started
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            className="border-2 border-blue-600 rounded-xl py-4 bg-transparent"
            onPress={handleLogin}
            activeOpacity={0.7}
          >
            <CustomText className="text-blue-600 text-center text-lg font-semibold tracking-wide">
              I Already Have an Account
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;