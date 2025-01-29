// import React from 'react';
// import { SafeAreaView, StatusBar } from 'react-native';
// import AppNavigator from './src/navigation/AppNavigator';

// const App = () => {
//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#111827" />
//       <SafeAreaView style={{ flex: 1, backgroundColor: '#111827' }}>
//         <AppNavigator />
//       </SafeAreaView>
//     </>
//   );
// };

// export default App; 




import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Platform, PermissionsAndroid } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import BleManager from 'react-native-ble-manager';

const App = () => {
  useEffect(() => {
    // Initialize BLE Manager
    const initializeBLE = async () => {
      try {
        await BleManager.start({ showAlert: false });
        console.log('BLE Manager initialized');

        if (Platform.OS === 'android' && Platform.Version >= 23) {
          await requestAndroidPermissions();
        }
      } catch (error) {
        console.error('Error initializing BLE Manager:', error);
      }
    };

    initializeBLE();

    return () => {
      // Cleanup
      BleManager.stopScan();
    };
  }, []);

  const requestAndroidPermissions = async () => {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ];

    // Add additional permissions for Android 12+
    if (Platform.Version >= 31) {
      permissions.push(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
      );
    }

    const results = await Promise.all(
      permissions.map((permission) =>
        PermissionsAndroid.request(permission, {
          title: 'Bluetooth Permission',
          message: 'App needs access to Bluetooth for taking attendance',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        })
      )
    );

    return results.every(
      (result) => result === PermissionsAndroid.RESULTS.GRANTED
    );
  };

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