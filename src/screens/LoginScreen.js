// LoginScreen.js
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    userType: 'student'
  });

  const handleLogin = () => {
    navigation.replace('MainApp');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-12 pb-6">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center rounded-full bg-blue-50"
        >
          <Icon name="arrow-back" size={24} color="#1e40af" />
        </TouchableOpacity>
        <CustomText className="text-black text-xl font-bold ml-4">
          Welcome Back
        </CustomText>
      </View>

      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Welcome Text */}
        <View className="mb-8">
          <CustomText className="text-black text-3xl font-bold mb-2">
            Hello Again! 👋
          </CustomText>
          <CustomText className="text-gray-600 text-lg">
            Sign in to continue
          </CustomText>
        </View>

        {/* User Type Selection */}
        <View className="flex-row mb-6">
          <TouchableOpacity 
            onPress={() => setFormData({...formData, userType: 'student'})}
            className={`flex-1 py-3 rounded-l-xl ${formData.userType === 'student' ? 'bg-blue-600' : 'bg-gray-100'}`}
          >
            <CustomText className={`text-center font-semibold ${formData.userType === 'student' ? 'text-white' : 'text-gray-600'}`}>
              Student
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setFormData({...formData, userType: 'teacher'})}
            className={`flex-1 py-3 rounded-r-xl ${formData.userType === 'teacher' ? 'bg-blue-600' : 'bg-gray-100'}`}
          >
            <CustomText className={`text-center font-semibold ${formData.userType === 'teacher' ? 'text-white' : 'text-gray-600'}`}>
              Teacher
            </CustomText>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <CustomInput
          label="ID"
          placeholder="Enter your ID"
          value={formData.id}
          onChangeText={(text) => setFormData({...formData, id: text})}
          leftIcon="finger-print-outline"
          containerClassName="mb-4"
        />

        <CustomInput
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry
          leftIcon="lock-closed-outline"
          containerClassName="mb-4"
        />

        {/* Forgot Password */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('ForgotPassword')}
          className="mb-8"
        >
          <CustomText className="text-blue-600 text-right font-semibold">
            Forgot Password?
          </CustomText>
        </TouchableOpacity>

        {/* Login Button */}
        <CustomButton
          title="Login"
          onPress={handleLogin}
          className="mb-8 bg-blue-600"
        />

        {/* Sign Up Link */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Signup')}
          className="flex-row justify-center items-center"
        >
          <CustomText className="text-gray-600 text-base">
            Don't have an account?{' '}
          </CustomText>
          <CustomText className="text-blue-600 text-base font-bold">
            Sign Up
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;