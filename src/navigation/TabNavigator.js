// TabNavigator.js
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';


import Dashboard from '../screens/DashboardScreen';
import Attendance from '../screens/AttendanceScreen';
import Reports from '../screens/ReportScreen';
import Classes from '../screens/ClassesScreen';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  // You can implement user role check here
  const isTeacher = true; // Replace with actual role check

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingTop: 10,
          height: 65,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Icon name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Attendance"
        component={Attendance}
        options={{
          tabBarLabel: isTeacher ? 'Take Attendance' : 'My Attendance',
          tabBarIcon: ({ color, size }) => (
            <Icon name={isTeacher ? "checkbox-outline" : "calendar-outline"} size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Classes"
        component={Classes}
        options={{
          tabBarLabel: isTeacher ? 'My Classes' : 'Subjects',
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default TabNavigator;

/*
Screen Templates (Create these files in your screens folder):

// Dashboard.js
export default function Dashboard() {
  return (
    <View className="flex-1 bg-white p-4">
      <CustomText>Dashboard Screen</CustomText>
    </View>
  );
}

// Attendance.js
export default function Attendance() {
  return (
    <View className="flex-1 bg-white p-4">
      <CustomText>Attendance Screen</CustomText>
    </View>
  );
}

// Classes.js
export default function Classes() {
  return (
    <View className="flex-1 bg-white p-4">
      <CustomText>Classes Screen</CustomText>
    </View>
  );
}

// Reports.js
export default function Reports() {
  return (
    <View className="flex-1 bg-white p-4">
      <CustomText>Reports Screen</CustomText>
    </View>
  );
}

// Profile.js
export default function Profile() {
  return (
    <View className="flex-1 bg-white p-4">
      <CustomText>Profile Screen</CustomText>
    </View>
  );
}
*/