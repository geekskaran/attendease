// Attendance.js
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import CustomText from '../components/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';

const Attendance = () => {
  const [userType] = useState('student'); // Replace with actual user role logic
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dummyClasses = [
    { id: 1, subject: 'Mathematics', time: '09:00 AM', teacher: 'Mr. Smith', room: '101', status: 'Present' },
    { id: 2, subject: 'Physics', time: '10:30 AM', teacher: 'Mrs. Johnson', room: '203', status: 'Absent' },
    { id: 3, subject: 'Chemistry', time: '12:00 PM', teacher: 'Dr. Brown', room: '305', status: 'Upcoming' },
  ];

  const renderHeader = () => (
    <View className="flex-row justify-between items-center mb-6">
      <View>
        <CustomText className="text-black text-2xl font-bold">
          {userType === 'student' ? 'My Attendance' : 'Take Attendance'}
        </CustomText>
        <CustomText className="text-gray-600 text-base mt-1">
          {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </CustomText>
      </View>
      {userType === 'teacher' && (
        <TouchableOpacity 
          className="bg-blue-600 px-4 py-2 rounded-xl"
        >
          <CustomText className="text-white font-semibold">Take Now</CustomText>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderStats = () => (
    <View className="flex-row justify-between mb-6">
      <View className="bg-blue-50 px-6 py-4 rounded-xl flex-1 mr-4">
        <CustomText className="text-gray-600">Present</CustomText>
        <CustomText className="text-2xl font-bold text-blue-600">85%</CustomText>
      </View>
      <View className="bg-red-50 px-6 py-4 rounded-xl flex-1">
        <CustomText className="text-gray-600">Absent</CustomText>
        <CustomText className="text-2xl font-bold text-red-600">15%</CustomText>
      </View>
    </View>
  );

  const renderClassList = () => (
    <View>
      <CustomText className="text-black text-xl font-bold mb-4">Today's Classes</CustomText>
      {dummyClasses.map(classItem => (
        <TouchableOpacity 
          key={classItem.id} 
          className="bg-white border border-gray-100 rounded-xl p-4 mb-4 shadow-sm"
        >
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Icon name="book-outline" size={20} color="#1e40af" />
              </View>
              <View>
                <CustomText className="text-black font-semibold text-lg">{classItem.subject}</CustomText>
                <CustomText className="text-gray-600">{classItem.time}</CustomText>
              </View>
            </View>
            <CustomText 
              className={`${
                classItem.status === 'Present' ? 'text-green-600' : 
                classItem.status === 'Absent' ? 'text-red-600' : 'text-blue-600'
              } font-medium`}
            >
              {classItem.status}
            </CustomText>
          </View>
          <View className="flex-row justify-between mt-2">
            <CustomText className="text-gray-600">
              <Icon name="person-outline" size={16} /> {classItem.teacher}
            </CustomText>
            <CustomText className="text-gray-600">
              <Icon name="location-outline" size={16} /> Room {classItem.room}
            </CustomText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {renderHeader()}
        {renderStats()}
        {renderClassList()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Attendance;