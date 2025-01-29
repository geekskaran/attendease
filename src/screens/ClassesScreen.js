// Classes.js
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import CustomText from '../components/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';

const Classes = () => {
  const [userType] = useState('student'); // Replace with actual user role logic
  const [activeTab, setActiveTab] = useState('ongoing');

  const dummyClasses = [
    {
      id: 1,
      subject: 'Mathematics',
      teacher: 'Mr. Smith',
      time: 'Mon, Wed, Fri - 09:00 AM',
      students: 35,
      room: '101',
      attendance: '92%'
    },
    {
      id: 2,
      subject: 'Physics',
      teacher: 'Mrs. Johnson',
      time: 'Tue, Thu - 10:30 AM',
      students: 28,
      room: '203',
      attendance: '88%'
    },
    {
      id: 3,
      subject: 'Chemistry',
      teacher: 'Dr. Brown',
      time: 'Mon, Wed - 12:00 PM',
      students: 30,
      room: '305',
      attendance: '95%'
    }
  ];

  const renderHeader = () => (
    <View className="mb-6">
      <CustomText className="text-black text-2xl font-bold">
        {userType === 'student' ? 'My Subjects' : 'My Classes'}
      </CustomText>
      <CustomText className="text-gray-600 text-base mt-1">
        {userType === 'student' ? 'Current Semester Subjects' : 'Manage Your Classes'}
      </CustomText>
    </View>
  );

  const renderTabs = () => (
    <View className="flex-row bg-gray-100 rounded-xl p-1 mb-6">
      <TouchableOpacity 
        className={`flex-1 py-3 px-4 rounded-lg ${activeTab === 'ongoing' ? 'bg-white shadow' : ''}`}
        onPress={() => setActiveTab('ongoing')}
      >
        <CustomText className={`text-center font-semibold ${activeTab === 'ongoing' ? 'text-blue-600' : 'text-gray-600'}`}>
          Ongoing
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity 
        className={`flex-1 py-3 px-4 rounded-lg ${activeTab === 'completed' ? 'bg-white shadow' : ''}`}
        onPress={() => setActiveTab('completed')}
      >
        <CustomText className={`text-center font-semibold ${activeTab === 'completed' ? 'text-blue-600' : 'text-gray-600'}`}>
          Completed
        </CustomText>
      </TouchableOpacity>
    </View>
  );

  const renderClassList = () => (
    <View>
      {userType === 'teacher' && (
        <TouchableOpacity className="bg-blue-600 rounded-xl p-4 mb-6 flex-row justify-center items-center">
          <Icon name="add-circle-outline" size={24} color="white" />
          <CustomText className="text-white font-semibold ml-2">Create New Class</CustomText>
        </TouchableOpacity>
      )}

      {dummyClasses.map(classItem => (
        <TouchableOpacity 
          key={classItem.id} 
          className="bg-white border border-gray-100 rounded-xl p-4 mb-4 shadow-sm"
        >
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Icon name="book-outline" size={24} color="#1e40af" />
              </View>
              <View>
                <CustomText className="text-black font-semibold text-lg">{classItem.subject}</CustomText>
                <CustomText className="text-gray-600">{classItem.teacher}</CustomText>
              </View>
            </View>
            {userType === 'student' && (
              <View className="bg-blue-50 px-3 py-1 rounded-full">
                <CustomText className="text-blue-600 font-medium">{classItem.attendance}</CustomText>
              </View>
            )}
          </View>

          <View className="flex-row justify-between mt-2">
            <CustomText className="text-gray-600">
              <Icon name="time-outline" size={16} /> {classItem.time}
            </CustomText>
            <CustomText className="text-gray-600">
              <Icon name="location-outline" size={16} /> Room {classItem.room}
            </CustomText>
          </View>

          {userType === 'teacher' && (
            <View className="mt-3 pt-3 border-t border-gray-100 flex-row justify-between">
              <CustomText className="text-gray-600">
                <Icon name="people-outline" size={16} /> {classItem.students} Students
              </CustomText>
              <TouchableOpacity>
                <CustomText className="text-blue-600 font-semibold">Manage</CustomText>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {renderHeader()}
        {renderTabs()}
        {renderClassList()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Classes;