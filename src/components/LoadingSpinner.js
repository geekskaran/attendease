import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import CustomText from './CustomText';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <View className="flex-1 bg-gray-900 items-center justify-center">
      <ActivityIndicator size="large" color="#9333EA" />
      <CustomText className="text-gray-400 mt-4">{message}</CustomText>
    </View>
  );
};

export default LoadingSpinner; 