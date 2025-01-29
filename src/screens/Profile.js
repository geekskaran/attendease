// Profile.js
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../components/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = () => {
  const navigation = useNavigation();
  const [userType] = useState('teacher'); // Replace with actual user role

  // Dummy user data - Replace with actual user data
  const userData = {
    name: 'John Doe',
    id: 'STU2024001',
    email: 'john.doe@example.com',
    class: 'Class X',
    section: 'A',
    joinedDate: 'January 2024'
  };

  const menuItems = [
    {
      icon: 'person-outline',
      title: 'Edit Profile',
      onPress: () => console.log('Edit Profile')
    },
    {
      icon: 'notifications-outline',
      title: 'Notifications',
      onPress: () => console.log('Notifications')
    },
    {
      icon: 'shield-outline',
      title: 'Privacy & Security',
      onPress: () => console.log('Privacy')
    },
    {
      icon: 'help-circle-outline',
      title: 'Help & Support',
      onPress: () => console.log('Help')
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Reset navigation to Auth screen
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          }
        }
      ]
    );
  };

  const renderHeader = () => (
    <View className="mb-6">
      <CustomText className="text-black text-2xl font-bold">Profile</CustomText>
      <CustomText className="text-gray-600 text-base mt-1">
        Manage your account
      </CustomText>
    </View>
  );

  const renderProfileCard = () => (
    <View className="bg-blue-50 rounded-xl p-6 mb-6">
      <View className="items-center mb-4">
        <View className="w-20 h-20 bg-blue-100 rounded-full items-center justify-center mb-3">
          <Icon name="person" size={40} color="#1e40af" />
        </View>
        <CustomText className="text-black text-xl font-bold">
          {userData.name}
        </CustomText>
        <CustomText className="text-gray-600">
          {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </CustomText>
      </View>

      <View className="bg-white rounded-lg p-4">
        <View className="flex-row items-center mb-3">
          <Icon name="card-outline" size={20} color="#1e40af" />
          <CustomText className="text-gray-600 ml-3">{userData.id}</CustomText>
        </View>
        <View className="flex-row items-center mb-3">
          <Icon name="mail-outline" size={20} color="#1e40af" />
          <CustomText className="text-gray-600 ml-3">{userData.email}</CustomText>
        </View>
        {userType === 'student' && (
          <>
            <View className="flex-row items-center mb-3">
              <Icon name="school-outline" size={20} color="#1e40af" />
              <CustomText className="text-gray-600 ml-3">
                {userData.class} - Section {userData.section}
              </CustomText>
            </View>
          </>
        )}
        <View className="flex-row items-center">
          <Icon name="calendar-outline" size={20} color="#1e40af" />
          <CustomText className="text-gray-600 ml-3">
            Joined {userData.joinedDate}
          </CustomText>
        </View>
      </View>
    </View>
  );

  const renderMenuItems = () => (
    <View className="bg-white rounded-xl mb-6">
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={item.onPress}
          className={`flex-row items-center py-4 px-4 border-b border-gray-100 
            ${index === menuItems.length - 1 ? 'border-b-0' : ''}`}
        >
          <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center">
            <Icon name={item.icon} size={20} color="#1e40af" />
          </View>
          <CustomText className="flex-1 text-black text-base ml-3">
            {item.title}
          </CustomText>
          <Icon name="chevron-forward" size={20} color="#94a3b8" />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderLogoutButton = () => (
    <TouchableOpacity
      onPress={handleLogout}
      className="flex-row items-center justify-center bg-red-50 py-4 px-6 rounded-xl mb-6"
    >
      <Icon name="log-out-outline" size={20} color="#dc2626" />
      <CustomText className="text-red-600 font-semibold ml-2">
        Logout
      </CustomText>
    </TouchableOpacity>
  );

  const renderVersion = () => (
    <View className="items-center mb-6">
      <CustomText className="text-gray-400 text-sm">
        Version 1.0.0
      </CustomText>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {renderHeader()}
        {renderProfileCard()}
        {renderMenuItems()}
        {renderLogoutButton()}
        {renderVersion()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;