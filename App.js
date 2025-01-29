import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }}>
        <AppNavigator />
      </SafeAreaView>
    </>
  );
};

export default App; 