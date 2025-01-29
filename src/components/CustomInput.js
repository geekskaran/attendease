// CustomInput.js
import React from 'react';
import { View, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({
  label,
  leftIcon,
  error,
  className = '',
  containerClassName = '',
  ...props
}) => {
  return (
    <View className={`mb-6 ${containerClassName}`}>
      {label && (
        <Text className="text-gray-700 text-base mb-2 font-medium">
          {label}
        </Text>
      )}
     
      <View className={`
        flex-row
        items-center
        bg-white
        rounded-xl
        border-2
        px-4
        h-[60px]
        ${error ? 'border-red-500' : 'border-blue-100'}
        ${className}
      `}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={22}
            color="#1e40af"
            style={{ marginRight: 10 }}
          />
        )}
        <TextInput
          className="flex-1 text-gray-900 text-base font-medium"
          placeholderTextColor="#94a3b8"
          autoCapitalize="none"
          {...props}
        />
      </View>
     
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;