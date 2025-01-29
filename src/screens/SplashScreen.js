// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.3);
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      navigation.replace('Auth');
    }, 5000);
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      <View className="absolute w-full h-full">
        {/* Decorative circles with increased visibility */}
        <View className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-400/20" />
        <View className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-blue-300/20" />
        <View className="absolute top-1/4 right-20 w-24 h-24 rounded-full bg-blue-500/20" />
      </View>

      <View className="flex-1 items-center justify-center">
        <Animated.View
          className="items-center"
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          {/* Animated logo mark with enhanced colors */}
          <Animated.View
            className="mb-8"
            style={{
              transform: [{ rotate: spin }],
            }}
          >
            <View className="w-24 h-24 items-center justify-center">
              <View className="absolute w-full h-full rounded-xl bg-blue-400/40 rotate-45" />
              <View className="absolute w-16 h-16 rounded-lg bg-blue-300/60 -rotate-45" />
              <View className="w-8 h-8 rounded-md bg-white" />
            </View>
          </Animated.View>

          <CustomText className="text-black text-5xl font-bold tracking-wider mb-3">
            AttendEase
          </CustomText>
          
          <CustomText className="text-black text-xl tracking-wide px-6 text-center font-medium">
            Streamlined Attendance Management
          </CustomText>

          <View className="absolute bottom-[-140]">
            <View className="items-center">
              <View className="w-12 h-1 bg-blue-300/50 rounded-full mb-6" />
              <CustomText className="text-black text-base font-medium">
                Version 1.0.0
              </CustomText>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default SplashScreen;