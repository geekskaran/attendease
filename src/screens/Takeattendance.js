import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CustomText from '../components/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';

const TakeAttendanceScreen = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState([]);
  const [presentStudents, setPresentStudents] = useState([]);

  // Commented out BLE-related work
  // useEffect(() => {
  //   BleManager.start({ showAlert: false });
  //   if (Platform.OS === 'android') {
  //     requestAndroidPermissions();
  //   }
  //   return () => {
  //     BleManager.stopScan();
  //   };
  // }, []);

  // const requestAndroidPermissions = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Bluetooth Permission',
  //         message: 'App needs access to Bluetooth for taking attendance',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //       Alert.alert('Permission Denied', 'Bluetooth permission is required for taking attendance');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const startScanningDevices = () => {
  //   if (!isScanning) {
  //     setIsScanning(true);
  //     setDiscoveredDevices([]);

  //     BleManager.scan([], 5, true)
  //       .then(() => console.log('Scanning started'))
  //       .catch((error) => Alert.alert('Error', 'Failed to start scanning'));

  //     BleManager.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);

  //     setTimeout(() => {
  //       BleManager.stopScan().then(() => {
  //         setIsScanning(false);
  //         BleManager.removeListener('BleManagerDiscoverPeripheral');
  //       });
  //     }, 5000);
  //   }
  // };

  // const handleDiscoverPeripheral = (peripheral) => {
  //   if (peripheral.name) {
  //     setDiscoveredDevices((prevDevices) => {
  //       if (!prevDevices.some(device => device.id === peripheral.id)) {
  //         return [...prevDevices, peripheral];
  //       }
  //       return prevDevices;
  //     });
  //   }
  // };

  const markAsPresent = (device) => {
    setPresentStudents((prevStudents) => {
      if (!prevStudents.some(student => student.id === device.id)) {
        return [...prevStudents, device];
      }
      return prevStudents;
    });
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="mb-6">
        <CustomText className="text-2xl font-bold text-black">Take Attendance</CustomText>
        <CustomText className="text-gray-600 mt-2">
          {isScanning ? 'Scanning for devices...' : 'Press the button to start scanning'}
        </CustomText>
      </View>

      <TouchableOpacity
        // onPress={startScanningDevices} // Removed BLE functionality
        disabled={isScanning}
        className={`mb-6 p-4 rounded-lg flex-row items-center justify-center ${
          isScanning ? 'bg-gray-300' : 'bg-blue-600'
        }`}
      >
        <Icon 
          name={isScanning ? 'bluetooth' : 'bluetooth-outline'} 
          size={24} 
          color="white" 
          className="mr-2"
        />
        <CustomText className="text-white text-lg font-semibold ml-2">
          {isScanning ? 'Scanning...' : 'Start Taking Attendance'}
        </CustomText>
      </TouchableOpacity>

      <ScrollView className="flex-1">
        <View className="mb-4">
          <CustomText className="text-lg font-semibold text-black mb-2">
            Discovered Devices ({discoveredDevices.length})
          </CustomText>
          {discoveredDevices.map((device) => (
            <TouchableOpacity
              key={device.id}
              onPress={() => markAsPresent(device)}
              className="bg-gray-100 p-4 rounded-lg mb-2 flex-row justify-between items-center"
            >
              <View>
                <CustomText className="text-black font-semibold">{device.name || 'Unknown Device'}</CustomText>
                <CustomText className="text-gray-600 text-sm">{device.id}</CustomText>
              </View>
              {presentStudents.some(student => student.id === device.id) ? (
                <View className="bg-green-100 px-3 py-1 rounded">
                  <CustomText className="text-green-800">Present</CustomText>
                </View>
              ) : (
                <Icon name="chevron-forward-outline" size={24} color="#666" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TakeAttendanceScreen;
