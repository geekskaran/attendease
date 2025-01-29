// SignupScreen.js
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    id: '',
    password: '',
    class: '',
    section: '',
    subjects: ''
  });

  const handleSignup = () => {
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
          Create Account
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
            Join AttendEase
          </CustomText>
          <CustomText className="text-gray-600 text-lg">
            Register as a Student or Teacher
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

        {/* Student-specific fields */}
        {userType === 'student' && (
          <>
            <CustomInput
              label="Roll Number"
              placeholder="Enter your roll number"
              value={formData.rollNumber}
              onChangeText={(text) => setFormData({...formData, rollNumber: text})}
              leftIcon="id-card-outline"
              containerClassName="mb-4"
            />
            <CustomInput
              label="Class"
              placeholder="Enter your class"
              value={formData.class}
              onChangeText={(text) => setFormData({...formData, class: text})}
              leftIcon="school-outline"
              containerClassName="mb-4"
            />
            <CustomInput
              label="Section"
              placeholder="Enter your section"
              value={formData.section}
              onChangeText={(text) => setFormData({...formData, section: text})}
              leftIcon="list-outline"
              containerClassName="mb-4"
            />
          </>
        )}

        {/* Common fields */}
        <CustomInput
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
          leftIcon="person-outline"
          containerClassName="mb-4"
        />

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
          placeholder="Create a password"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          secureTextEntry
          leftIcon="lock-closed-outline"
          containerClassName="mb-8"
        />

        {/* Signup Button */}
        <CustomButton
          title="Create Account"
          onPress={handleSignup}
          className="mb-8 bg-blue-600"
        />

        {/* Login Link */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          className="flex-row justify-center items-center"
        >
          <CustomText className="text-gray-600 text-base">
            Already have an account?{' '}
          </CustomText>
          <CustomText className="text-blue-600 text-base font-bold">
            Login
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;