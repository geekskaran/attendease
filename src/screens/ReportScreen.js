// Reports.js
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import CustomText from '../components/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';

const Reports = () => {
  const [userType] = useState('student');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const attendanceData = {
    total: {
      present: 85,
      absent: 10,
      leave: 5,
      percentage: '85%'
    },
    subjectWise: [
      { subject: 'Mathematics', present: 92, absent: 8, status: 'Excellent' },
      { subject: 'Physics', present: 88, absent: 12, status: 'Good' },
      { subject: 'Chemistry', present: 85, absent: 15, status: 'Good' },
      { subject: 'Biology', present: 82, absent: 18, status: 'Average' }
    ],
    monthlyData: [
      { month: 'Jan', attendance: 90 },
      { month: 'Feb', attendance: 85 },
      { month: 'Mar', attendance: 88 },
      { month: 'Apr', attendance: 92 },
      { month: 'May', attendance: 86 }
    ]
  };

  const renderHeader = () => (
    <View className="mb-6">
      <View className="flex-row justify-between items-center">
        <View>
          <CustomText className="text-black text-2xl font-bold">
            Attendance Reports
          </CustomText>
          <CustomText className="text-gray-600 text-base mt-1">
            Track your attendance analytics
          </CustomText>
        </View>
        <TouchableOpacity 
          className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center"
        >
          <Icon name="download-outline" size={20} color="#1e40af" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPeriodSelector = () => (
    <View className="flex-row bg-gray-100 rounded-xl p-1 mb-6">
      {['week', 'month', 'semester'].map((period) => (
        <TouchableOpacity 
          key={period}
          className={`flex-1 py-3 px-4 rounded-lg ${selectedPeriod === period ? 'bg-white shadow' : ''}`}
          onPress={() => setSelectedPeriod(period)}
        >
          <CustomText 
            className={`text-center font-semibold capitalize ${
              selectedPeriod === period ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            {period}
          </CustomText>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderOverallStats = () => (
    <View className="mb-6">
      <View className="bg-blue-50 rounded-xl p-4 mb-4">
        <View className="flex-row justify-between items-center mb-4">
          <CustomText className="text-black font-semibold text-lg">
            Overall Attendance
          </CustomText>
          <View className="bg-blue-100 px-3 py-1 rounded-full">
            <CustomText className="text-blue-600 font-semibold">
              {attendanceData.total.percentage}
            </CustomText>
          </View>
        </View>
        
        <View className="flex-row justify-between">
          <View className="bg-green-50 px-4 py-3 rounded-lg flex-1 mr-2">
            <CustomText className="text-gray-600">Present</CustomText>
            <CustomText className="text-green-600 text-xl font-bold mt-1">
              {attendanceData.total.present}
            </CustomText>
          </View>
          <View className="bg-red-50 px-4 py-3 rounded-lg flex-1 mr-2">
            <CustomText className="text-gray-600">Absent</CustomText>
            <CustomText className="text-red-600 text-xl font-bold mt-1">
              {attendanceData.total.absent}
            </CustomText>
          </View>
          <View className="bg-orange-50 px-4 py-3 rounded-lg flex-1">
            <CustomText className="text-gray-600">Leave</CustomText>
            <CustomText className="text-orange-600 text-xl font-bold mt-1">
              {attendanceData.total.leave}
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );

  const renderMonthlyOverview = () => (
    <View className="mb-6">
      <CustomText className="text-black font-semibold text-lg mb-4">
        Monthly Overview
      </CustomText>
      <View className="bg-white border border-gray-100 rounded-xl p-4">
        {attendanceData.monthlyData.map((month, index) => (
          <View key={index} className="mb-3 last:mb-0">
            <View className="flex-row justify-between mb-1">
              <CustomText className="text-gray-600">{month.month}</CustomText>
              <CustomText className="text-blue-600 font-semibold">{month.attendance}%</CustomText>
            </View>
            <View className="h-2 bg-gray-100 rounded-full">
              <View 
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${month.attendance}%` }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSubjectWiseAttendance = () => (
    <View className="mb-6">
      <CustomText className="text-black font-semibold text-lg mb-4">
        Subject-wise Attendance
      </CustomText>
      {attendanceData.subjectWise.map((subject, index) => (
        <View 
          key={index}
          className="bg-white border border-gray-100 rounded-xl p-4 mb-3"
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Icon name="book-outline" size={20} color="#1e40af" />
              </View>
              <View>
                <CustomText className="text-black font-semibold">
                  {subject.subject}
                </CustomText>
                <CustomText className="text-gray-600 text-sm">
                  {subject.present}% Present
                </CustomText>
              </View>
            </View>
            <View className={`px-3 py-1 rounded-full ${
              subject.status === 'Excellent' ? 'bg-green-100' :
              subject.status === 'Good' ? 'bg-blue-100' : 'bg-orange-100'
            }`}>
              <CustomText className={`font-medium ${
                subject.status === 'Excellent' ? 'text-green-600' :
                subject.status === 'Good' ? 'text-blue-600' : 'text-orange-600'
              }`}>
                {subject.status}
              </CustomText>
            </View>
          </View>
          
          <View className="h-2 bg-gray-100 rounded-full mt-3">
            <View 
              className="h-2 bg-blue-600 rounded-full"
              style={{ width: `${subject.present}%` }}
            />
          </View>
        </View>
      ))}
    </View>
  );

  const renderActionButtons = () => (
    <View className="flex-row justify-between mb-6">
      <TouchableOpacity 
        className="flex-1 bg-blue-600 rounded-xl py-4 mr-2 flex-row justify-center items-center"
      >
        <Icon name="download-outline" size={20} color="white" />
        <CustomText className="text-white font-semibold ml-2">
          Download Report
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity 
        className="flex-1 bg-white border border-blue-600 rounded-xl py-4 ml-2 flex-row justify-center items-center"
      >
        <Icon name="share-outline" size={20} color="#2563eb" />
        <CustomText className="text-blue-600 font-semibold ml-2">
          Share Report
        </CustomText>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {renderHeader()}
        {renderPeriodSelector()}
        {renderOverallStats()}
        {renderMonthlyOverview()}
        {renderSubjectWiseAttendance()}
        {renderActionButtons()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Reports;