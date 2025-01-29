import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  AppState,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import SQLite from 'react-native-sqlite-storage';
import CustomText from '../components/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// Database initialization
const db = SQLite.openDatabase(
  { name: 'AttendanceDB', location: 'default' },
  () => console.log('Database connected'),
  error => console.error('Database error:', error)
);

const TakeAttendanceScreen = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState([]);
  const [presentStudents, setPresentStudents] = useState([]);
  const [storedDevices, setStoredDevices] = useState([]);
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);
  
  const scanTimeoutRef = useRef(null);

  const requestPermissions = useCallback(async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      try {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ...(Platform.Version >= 31 ? [
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          ] : [])
        ];

        const results = await Promise.all(
          permissions.map(permission => PermissionsAndroid.request(permission))
        );

        const allGranted = results.every(
          result => result === PermissionsAndroid.RESULTS.GRANTED
        );

        setHasPermissions(allGranted);
        return allGranted;
      } catch (error) {
        console.error('Permission error:', error);
        return false;
      }
    }
    return true;
  }, []);

  const initializeBLE = useCallback(async () => {
    try {
      await BleManager.enableBluetooth();
      await BleManager.start({ showAlert: false });
      const state = await BleManager.checkState();
      setIsBluetoothEnabled(state === 'on');
    } catch (error) {
      console.error('BLE init error:', error);
    }
  }, []);

  const loadStoredDevices = useCallback(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM devices ORDER BY timestamp DESC',
        [],
        (_, { rows: { _array } }) => setStoredDevices(_array || []),
        (_, error) => console.error('Load devices error:', error)
      );
    });
  }, []);

  const handleDiscoverPeripheral = useCallback((peripheral) => {
    if (peripheral?.name) {
      setDiscoveredDevices(prev => {
        if (!prev.some(device => device.id === peripheral.id)) {
          return [...prev, peripheral];
        }
        return prev;
      });
    }
  }, []);

  const startScan = useCallback(async () => {
    console.log('Starting scan...');
    if (!hasPermissions) {
      const granted = await requestPermissions();
      if (!granted) return;
    }

    if (!isBluetoothEnabled) {
      Alert.alert('Enable Bluetooth', 'Please enable Bluetooth to scan devices');
      return;
    }

    try {
      setDiscoveredDevices([]);
      await BleManager.scan([], 0, true);
      setIsScanning(true);
      
      // Auto-stop scan after 30 seconds
      scanTimeoutRef.current = setTimeout(stopScan, 30000);
      console.log('Scan started successfully');
    } catch (error) {
      console.error('Scan error:', error);
      setIsScanning(false);
    }
  }, [hasPermissions, isBluetoothEnabled]);

  const stopScan = useCallback(async () => {
    try {
      await BleManager.stopScan();
      setIsScanning(false);
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
      console.log('Scan stopped');
    } catch (error) {
      console.error('Stop scan error:', error);
    }
  }, []);

  const markAsPresent = useCallback((device) => {
    setPresentStudents(prev => {
      if (!prev.some(student => student.id === device.id)) {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT OR REPLACE INTO devices (id, name, timestamp, status) VALUES (?, ?, ?, ?)',
            [device.id, device.name || 'Unknown', new Date().toISOString(), 'present'],
            () => loadStoredDevices(),
            (_, error) => console.error('Mark present error:', error)
          );
        });
        return [...prev, device];
      }
      return prev;
    });
  }, [loadStoredDevices]);

  const deleteStoredDevice = useCallback((deviceId) => {
    Alert.alert(
      'Confirm Delete',
      'Remove this device?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            db.transaction(tx => {
              tx.executeSql(
                'DELETE FROM devices WHERE id = ?',
                [deviceId],
                () => loadStoredDevices(),
                (_, error) => console.error('Delete error:', error)
              );
            });
          }
        }
      ]
    );
  }, [loadStoredDevices]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS devices (
          id TEXT PRIMARY KEY,
          name TEXT,
          timestamp TEXT,
          status TEXT
        )`,
        [],
        () => console.log('Table created'),
        (_, error) => console.error('Table creation error:', error)
      );
    });

    const appStateSubscription = AppState.addEventListener('change', nextState => {
      if (nextState === 'active') {
        BleManager.checkState()
          .then(state => setIsBluetoothEnabled(state === 'on'));
      }
    });

    const setup = async () => {
      const permissionsGranted = await requestPermissions();
      if (permissionsGranted) await initializeBLE();
    };
    setup();
    loadStoredDevices();

    const listeners = [
      bleManagerEmitter.addListener('BleManagerStartScan', () => setIsScanning(true)),
      bleManagerEmitter.addListener('BleManagerStopScan', () => setIsScanning(false)),
      bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral),
      bleManagerEmitter.addListener('BleManagerDidUpdateState', args => 
        setIsBluetoothEnabled(args.state === 'on')
      )
    ];

    return () => {
      listeners.forEach(listener => listener.remove());
      appStateSubscription.remove();
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
      BleManager.stopScan();
    };
  }, []);

  return (
    <View className="flex-1 bg-white p-4">
      <View className="mb-4">
        <CustomText className="text-2xl font-bold text-black">
          Take Attendance
        </CustomText>
        <CustomText className="text-gray-600 mt-1">
          {!isBluetoothEnabled 
            ? 'Please enable Bluetooth'
            : isScanning 
              ? 'Scanning for devices...' 
              : 'Press Start Scan to begin'}
        </CustomText>
      </View>

      <View className="flex-row space-x-4 mb-6">
        <TouchableOpacity
          onPress={startScan}
          disabled={!isBluetoothEnabled || isScanning}
          className={`flex-1 p-4 rounded-lg flex-row items-center justify-center ${
            !isBluetoothEnabled || isScanning ? 'bg-gray-300' : 'bg-blue-600'
          }`}
        >
          {/* <Icon name="bluetooth" size={24} color="white" /> */}
          <CustomText className="text-white font-semibold ml-2">
            Start Attendance
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={stopScan}
          disabled={!isScanning}
          className={`flex-1 p-4 rounded-lg flex-row items-center justify-center ${
            !isScanning ? 'bg-gray-300' : 'bg-red-500'
          }`}
        >
          <Icon name="stop-circle" size={24} color="white" />
          <CustomText className="text-white font-semibold ml-2">
            Stop Scan
          </CustomText>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <CustomText className="text-lg font-semibold">
              Discovered Devices
            </CustomText>
            <View className="bg-gray-100 px-3 py-1 rounded-full">
              <CustomText className="text-gray-600">
                {discoveredDevices.length}
              </CustomText>
            </View>
          </View>

          {discoveredDevices.map(device => (
            <TouchableOpacity
              key={device.id}
              onPress={() => markAsPresent(device)}
              className="bg-gray-50 p-4 rounded-lg mb-2 flex-row justify-between items-center border border-gray-100"
            >
              <View>
                <CustomText className="font-semibold">
                  {device.name || 'Unknown Device'}
                </CustomText>
                <CustomText className="text-gray-600 text-sm">
                  {device.id}
                </CustomText>
              </View>
              {presentStudents.some(s => s.id === device.id) ? (
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <CustomText className="text-green-800">Present</CustomText>
                </View>
              ) : (
                <Icon name="chevron-forward" size={20} color="#666" />
              )}
            </TouchableOpacity>
          ))}

          {discoveredDevices.length === 0 && !isScanning && (
            <View className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <CustomText className="text-gray-500 text-center">
                No devices found
              </CustomText>
            </View>
          )}
        </View>

        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <CustomText className="text-lg font-semibold">
              Stored Devices
            </CustomText>
            <View className="bg-gray-100 px-3 py-1 rounded-full">
              <CustomText className="text-gray-600">
                {storedDevices.length}
              </CustomText>
            </View>
          </View>

          {storedDevices.map(device => (
            <View
              key={device.id}
              className="bg-gray-50 p-4 rounded-lg mb-2 flex-row justify-between items-center border border-gray-100"
            >
              <View className="flex-1">
                <CustomText className="font-semibold">{device.name}</CustomText>
                <CustomText className="text-gray-600 text-sm">{device.id}</CustomText>
                <CustomText className="text-gray-500 text-xs mt-1">
                  {new Date(device.timestamp).toLocaleString()}
                </CustomText>
              </View>
              <TouchableOpacity
                onPress={() => deleteStoredDevice(device.id)}
                className="bg-red-50 p-2 rounded-full ml-4"
              >
                <Icon name="trash-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}

          {storedDevices.length === 0 && (
            <View className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <CustomText className="text-gray-500 text-center">
                No stored devices
              </CustomText>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TakeAttendanceScreen;