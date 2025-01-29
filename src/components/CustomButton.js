

// CustomButton.js
import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import CustomText from './CustomText';

const CustomButton = ({
  title,
  onPress,
  variant = 'filled',
  loading = false,
  disabled = false,
  className = ''
}) => {
  const getButtonStyle = () => {
    if (variant === 'filled') {
      return disabled
        ? 'bg-blue-400'
        : 'bg-blue-600 active:bg-blue-700';
    }
    return 'bg-transparent border-2 border-blue-600';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`h-14 rounded-xl items-center justify-center ${getButtonStyle()} ${className}`}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'filled' ? 'white' : '#2563eb'} />
      ) : (
        <CustomText className={`text-lg font-semibold ${
          variant === 'filled' ? 'text-white' : 'text-blue-600'
        }`}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;