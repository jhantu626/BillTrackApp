import BLEPrinter from 'react-native-bluetooth-classic';
import {ToastContainer} from '../Components';
import {Alert, PermissionsAndroid, Platform} from 'react-native';

class PrinterService {
  async requestPermission() {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 31) {
        const permissions = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);
        return (
          permissions['android.permission.BLUETOOTH_CONNECT'] === 'granted'
        );
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  }

  async detectDevices() {
    try {
      const granted = await this.requestPermission();
      if (!granted) {
        Alert.alert('Permission Denied');
        return null;
      }
      const isBluetoothEnabled = await BLEPrinter.isBluetoothEnabled();
      if (!isBluetoothEnabled) {
        Alert.alert('Please enable Bluetooth');
        return null;
      }
      const bondedPrinters = await BLEPrinter.getBondedDevices();
      return bondedPrinters;
    } catch (error) {
      return null;
    }
  }
}

const printerService = new PrinterService();

export default printerService;
