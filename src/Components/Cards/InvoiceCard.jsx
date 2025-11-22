import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import DottedDivider from '../Dividers/DottedDivider';
import Lucide from '@react-native-vector-icons/lucide';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {gap, padding, font, icon} from '../../utils/responsive';
import {formatDate} from '../../utils/helper';
import ToastService from '../Toasts/ToastService';
import RNBluetooth from 'react-native-bluetooth-classic';
import {BLEPrinter} from 'react-native-thermal-receipt-printer';

// const {width} = Dimensions.get('screen');

const InvoiceCard = memo(({invoice}) => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const sentWhatapp = async () => {
    const link = 'whatsapp://send?text=test&phone=919775746484';
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      await Linking.openURL(link);
    } else {
      ToastAndroid.show('Please install whatsapp', ToastAndroid.SHORT);
    }
  };

  // async function getPairedPrinter() {
  //   const pairedDevices = await RNBluetooth.getBondedDevices();
  //   return pairedDevices[0];
  // }

  const requestPermissions = async () => {
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
  };

  const printBill = async () => {
    try {
      // Request Bluetooth permissions
      const granted = await requestPermissions();
      if (!granted) {
        ToastAndroid.show('Permission denied', ToastAndroid.SHORT);
        return;
      }
      console.log('granted', granted);

      // Check if Bluetooth is enabled
      const isEnabled = await RNBluetooth.isBluetoothEnabled();
      if (!isEnabled) {
        ToastAndroid.show('Please enable Bluetooth', ToastAndroid.SHORT);
        return;
      }

      // Get paired devices
      const pairedDevices = await RNBluetooth.getBondedDevices();
      console.log('Paired devices:', pairedDevices);

      if (pairedDevices.length === 0) {
        ToastAndroid.show(
          'No paired Bluetooth devices found',
          ToastAndroid.SHORT,
        );
        return;
      }

      // Find printer device (you might want to filter by name or let user select)
      const printerDevice = pairedDevices[0]; // Or filter by device name containing 'printer'

      // Connect to printer
      const connected = await RNBluetooth.connectToDevice(printerDevice.id);
      console.log('Connected:', connected ? true : false);

      if (!connected) {
        ToastAndroid.show('Failed to connect to printer', ToastAndroid.SHORT);
        return;
      }

      // Build receipt text
      let receipt = '';

      // Header
      receipt += '================================\n';
      receipt += '          INVOICE\n';
      receipt += '================================\n\n';

      // Invoice details
      receipt += `Invoice No: ${invoice.invoiceNumber}\n`;

      if (invoice.customerNumber) {
        receipt += `Customer: +91 ${invoice.customerNumber}\n`;
      }

      receipt += `Date: ${formatDate(invoice.createdAt)}\n`;
      receipt += `Status: ${invoice.status}\n`;
      receipt += '--------------------------------\n';

      // Total
      receipt += `TOTAL AMOUNT: ₹${invoice?.totalAmount}\n`;
      receipt += '================================\n\n';
      receipt += '       Thank You!\n';
      receipt += '       Visit Again\n';

      // Add line feed and cut command
      receipt += '\n\n';
      receipt += '--------------------------------\n';
      // Send data to printer
      await RNBluetooth.writeToDevice(printerDevice.id, receipt);

      ToastAndroid.show('Print successful', ToastAndroid.SHORT);

      // Disconnect after printing (optional)
      setTimeout(async () => {
        await RNBluetooth.disconnectFromDevice(printerDevice.id);
      }, 1000);
    } catch (error) {
      console.error('Print error:', error);
      ToastAndroid.show('Print failed: ' + error.message, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={[styles.tsText]}>{invoice?.invoiceNumber}</Text>
          {invoice?.customerNumber && (
            <Text style={[styles.numberText]}>
              +91 {invoice?.customerNumber}
            </Text>
          )}
        </View>
        <Text style={[styles.dateText]}>{formatDate(invoice?.createdAt)}</Text>
        <View style={styles.right}>
          <View style={styles.paidContainer}>
            <Text style={[styles.paidText]}>{invoice?.status}</Text>
          </View>
          <Text style={[styles.priceText]}>₹ {invoice?.totalAmount}</Text>
        </View>
      </View>
      <DottedDivider />
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.subBottomContainer}>
          <Lucide
            name="message-square-text"
            size={icon(18)}
            color={'#007aff'}
          />
          <Text style={[{color: '#007aff'}, styles.subBottomContainerText]}>
            SMS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subBottomContainer}
          onPress={sentWhatapp}>
          <Ionicons name="logo-whatsapp" size={icon(18)} color={'#04bd01'} />
          <Text style={[{color: '#04bd01'}, styles.subBottomContainerText]}>
            Whatsapp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subBottomContainer} onPress={printBill}>
          <Lucide name="printer" size={icon(18)} color={'#ff393c'} />
          <Text style={[{color: '#ff393c'}, styles.subBottomContainerText]}>
            Print
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subBottomContainer}
          onPress={() => {
            navigation.navigate('InvoiceDetails', {invoice: invoice});
          }}>
          <Lucide name="eye" size={icon(18)} color={'#00000090'} />
          <Text style={[{color: '#00000090'}, styles.subBottomContainerText]}>
            Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default InvoiceCard;

const styles = StyleSheet.create({
  mainContainer: {
    // height: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: padding(10),
  },
  container: {
    // height: 65,
    // borderRadius: 5,
    paddingHorizontal: padding(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    gap: 6,
  },
  tsText: {
    fontSize: font(14),
    fontFamily: fonts.inBold,
    color: colors.primary,
  },
  numberText: {
    fontSize: font(12),
    fontFamily: fonts.inRegular,
    color: '#00000080',
  },
  right: {
    gap: 6,
    alignItems: 'flex-end',
  },
  paidContainer: {
    backgroundColor: colors.sucess + 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: padding(3),
    paddingHorizontal: padding(8),
  },
  paidText: {
    fontSize: font(8),
    fontFamily: fonts.inSemiBold,
    color: colors.sucess,
  },
  priceText: {
    fontSize: font(14),
    fontFamily: fonts.inSemiBold,
    color: '#000000',
  },
  dateText: {
    fontSize: font(10),
    fontFamily: fonts.inRegular,
    color: '#00000080',
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: padding(16),
  },
  subBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: gap(5),
  },
  subBottomContainerText: {
    fontSize: font(12),
    fontFamily: fonts.inBold,
  },
});
