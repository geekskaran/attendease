// ForgotPasswordScreen.js
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    id: '',
    email: ''
  });

  const handleResetPassword = async () => {
    // TODO: Implement password reset logic
    console.log('Reset password for:', formData);
    navigation.navigate('ResetPasswordConfirmation');
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header with Back Button */}
      <View className="flex-row items-center px-6 pt-12 pb-6">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center rounded-full bg-blue-50"
        >
          <Icon name="arrow-back" size={24} color="#1e40af" />
        </TouchableOpacity>
        <CustomText className="text-black text-xl font-bold ml-4">
          Forgot Password
        </CustomText>
      </View>

      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
      >
        {/* Description Text */}
        <View className="mb-8">
          <CustomText className="text-black text-2xl font-bold mb-2">
            Reset Your Password
          </CustomText>
          <CustomText className="text-gray-600 text-base">
            Enter your ID and registered email address. We'll send you instructions to reset your password.
          </CustomText>
        </View>

        {/* User Type Selection */}
        <View className="flex-row mb-6">
          <TouchableOpacity 
            onPress={() => setUserType('student')}
            className={`flex-1 py-3 rounded-l-xl ${userType === 'student' ? 'bg-blue-600' : 'bg-gray-100'}`}
          >
            <CustomText className={`text-center font-semibold ${userType === 'student' ? 'text-white' : 'text-gray-600'}`}>
              Student
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setUserType('teacher')}
            className={`flex-1 py-3 rounded-r-xl ${userType === 'teacher' ? 'bg-blue-600' : 'bg-gray-100'}`}
          >
            <CustomText className={`text-center font-semibold ${userType === 'teacher' ? 'text-white' : 'text-gray-600'}`}>
              Teacher
            </CustomText>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <CustomInput
          label="Your ID"
          placeholder={`Enter your ${userType} ID`}
          value={formData.id}
          onChangeText={(text) => setFormData({...formData, id: text})}
          leftIcon="finger-print-outline"
          containerClassName="mb-4"
        />

        <CustomInput
          label="Email Address"
          placeholder="Enter your registered email"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
          leftIcon="mail-outline"
          containerClassName="mb-8"
        />

        {/* Reset Button */}
        <CustomButton
          title="Reset Password"
          onPress={handleResetPassword}
          className="mb-8 bg-blue-600"
        />

        {/* Back to Login Link */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          className="flex-row justify-center items-center mb-8"
        >
          <CustomText className="text-gray-600 text-base">
            Remember your password?{' '}
          </CustomText>
          <CustomText className="text-blue-600 text-base font-bold">
            Login
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ForgotPasswordScreen;