import React from 'react';
import { Text } from 'react-native';

const CustomText = ({ children, className, ...props }) => {
  return (
    <Text className={`font-regular ${className}`} {...props}>
      {children}
    </Text>
  );
};

export default CustomText; 