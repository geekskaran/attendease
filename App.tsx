import React, {useEffect} from 'react';
import {Alert, TextInput, View} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
const App = () => {
  return (
    <View style={{flex: 1}}>
      {/* <View className="bg-red-500"  style={{flex: 1}}>
          <TextInput />
        </View> */}
      <AppNavigator />
    </View>
  );
};

export default App;
