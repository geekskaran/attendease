// Dashboard.js
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import CustomText from '../components/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const Dashboard = () => {

  const navigation = useNavigation(); // ✅ Fix: Get navigation object

  const [userType] = useState('teacher'); // Replace with actual user role logic

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Sample data - Replace with actual data
  const studentStats = {
    totalClasses: 45,
    attendedClasses: 42,
    attendance: '93.33%',
    currentStreak: 5
  };

  const teacherStats = {
    totalStudents: 120,
    classesToday: 4,
    pendingAttendance: 2,
    activeClasses: 6
  };

  const recentActivities = [
    { id: 1, subject: 'Mathematics', time: '10:30 AM', status: 'Present' },
    { id: 2, subject: 'Physics', time: '11:45 AM', status: 'Present' },
    { id: 3, subject: 'Chemistry', time: '2:15 PM', status: 'Upcoming' }
  ];

  const renderHeader = () => (
    <View className="flex-row justify-between items-center mb-6">
      <View>
        <CustomText className="text-gray-600 text-base">
          {currentDate}
        </CustomText>
        <CustomText className="text-black text-2xl font-bold mt-1">
          {userType === 'student' ? 'Student Dashboard' : 'Teacher Dashboard'}
        </CustomText>
      </View>
      <TouchableOpacity
        className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center"
      >
        <Icon name="notifications-outline" size={20} color="#1e40af" />
      </TouchableOpacity>
    </View>
  );

  const renderStatsCards = () => (
    <View className="flex-row flex-wrap justify-between mb-6">
      {userType === 'student' ? (
        <>
          <View className="w-[48%] bg-blue-50 p-4 rounded-xl mb-4">
            <Icon name="calendar-outline" size={24} color="#1e40af" />
            <CustomText className="text-gray-600 text-sm mt-2">Total Classes</CustomText>
            <CustomText className="text-black text-xl font-bold">{studentStats.totalClasses}</CustomText>
          </View>
          <View className="w-[48%] bg-green-50 p-4 rounded-xl mb-4">
            <Icon name="checkmark-circle-outline" size={24} color="#15803d" />
            <CustomText className="text-gray-600 text-sm mt-2">Attendance</CustomText>
            <CustomText className="text-black text-xl font-bold">{studentStats.attendance}</CustomText>
          </View>
          <View className="w-[48%] bg-purple-50 p-4 rounded-xl">
            <Icon name="flame-outline" size={24} color="#7e22ce" />
            <CustomText className="text-gray-600 text-sm mt-2">Current Streak</CustomText>
            <CustomText className="text-black text-xl font-bold">{studentStats.currentStreak} days</CustomText>
          </View>
          <View className="w-[48%] bg-orange-50 p-4 rounded-xl">
            <Icon name="time-outline" size={24} color="#c2410c" />
            <CustomText className="text-gray-600 text-sm mt-2">Classes Today</CustomText>
            <CustomText className="text-black text-xl font-bold">3</CustomText>
          </View>
        </>
      ) : (
        // Teacher Stats Cards
        <>
          <View className="w-[48%] bg-blue-50 p-4 rounded-xl mb-4">
            <Icon name="people-outline" size={24} color="#1e40af" />
            <CustomText className="text-gray-600 text-sm mt-2">Total Students</CustomText>
            <CustomText className="text-black text-xl font-bold">{teacherStats.totalStudents}</CustomText>
          </View>
          <View className="w-[48%] bg-green-50 p-4 rounded-xl mb-4">
            <Icon name="today-outline" size={24} color="#15803d" />
            <CustomText className="text-gray-600 text-sm mt-2">Classes Today</CustomText>
            <CustomText className="text-black text-xl font-bold">{teacherStats.classesToday}</CustomText>
          </View>
          <View className="w-[48%] bg-red-50 p-4 rounded-xl">
            <Icon name="alert-circle-outline" size={24} color="#dc2626" />
            <CustomText className="text-gray-600 text-sm mt-2">Pending</CustomText>
            <CustomText className="text-black text-xl font-bold">{teacherStats.pendingAttendance}</CustomText>
          </View>
          <View className="w-[48%] bg-purple-50 p-4 rounded-xl">
            <Icon name="book-outline" size={24} color="#7e22ce" />
            <CustomText className="text-gray-600 text-sm mt-2">Active Classes</CustomText>
            <CustomText className="text-black text-xl font-bold">{teacherStats.activeClasses}</CustomText>
          </View>
        </>
      )}
    </View>
  );

  const renderQuickActions = () => (


    <View className="mb-6">
      <CustomText className="text-black text-xl font-bold mb-4">Quick Actions</CustomText>
      <View className="flex-row justify-between">
        <TouchableOpacity
          className="items-center"
          onPress={() => navigation.navigate('TakeAttendance')}
        >
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-2">
            <Icon name="people-outline" size={24} color="#1e40af" />
          </View>
          <CustomText className="text-gray-600 text-sm">Start Attendance</CustomText>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-2">
            <Icon name="calendar-outline" size={24} color="#1e40af" />
          </View>
          <CustomText className="text-gray-600 text-sm">Schedule</CustomText>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-2">
            <Icon name="bar-chart-outline" size={24} color="#1e40af" />
          </View>
          <CustomText className="text-gray-600 text-sm">Reports</CustomText>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-2">
            <Icon name="help-circle-outline" size={24} color="#1e40af" />
          </View>
          <CustomText className="text-gray-600 text-sm">Help</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRecentActivity = () => (
    <View>
      <CustomText className="text-black text-xl font-bold mb-4">Recent Activity</CustomText>
      {recentActivities.map(activity => (
        <View key={activity.id} className="flex-row items-center justify-between bg-gray-50 p-4 rounded-xl mb-3">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Icon name="book-outline" size={20} color="#1e40af" />
            </View>
            <View>
              <CustomText className="text-black font-semibold">{activity.subject}</CustomText>
              <CustomText className="text-gray-600 text-sm">{activity.time}</CustomText>
            </View>
          </View>
          <CustomText className={`${activity.status === 'Present' ? 'text-green-600' :
            activity.status === 'Absent' ? 'text-red-600' : 'text-blue-600'
            } font-medium`}>
            {activity.status}
          </CustomText>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {renderHeader()}
        {renderStatsCards()}
        {renderQuickActions()}
        {renderRecentActivity()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;