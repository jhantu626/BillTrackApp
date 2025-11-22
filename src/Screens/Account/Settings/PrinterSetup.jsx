import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Layout} from '../../Layout';
import {SecondaryHeader} from '../../../Components';
import ScanLoader from '../../../Components/Loaders/ScanLoader';
import printerService from '../../../utils/PrinterService';
import {font, padding} from '../../../utils/responsive';
import {usePrinter} from '../../../Contexts/PrinterContext';
import {print} from '@gorhom/bottom-sheet/lib/typescript/utilities/logger';
import ToastService from '../../../Components/Toasts/ToastService';

const PrinterSetup = () => {
  const {printer, setSelectedPrinter, setAsDefaultPrinter} = usePrinter();

  // Data States
  const [printers, setPrinters] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Loading State
  const [isLoading, setIsLoading] = useState(true);
  const [isDefaultSetLoading, setIsDefaultSetLoading] = useState(false);
  const [isSetLoading, setIsSetLoading] = useState(false);

  const detectDevices = async () => {
    try {
      const devices = await printerService.detectDevices();
      setPrinters(devices);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    detectDevices();
  }, []);

  const renderDevice = ({item}) => {
    const isSelected = selectedDevice?.address === item.address;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedDevice(item)}>
        <Text style={styles.deviceName}>{item.name}</Text>
        <Text style={styles.deviceAddress}>{item.address}</Text>
      </TouchableOpacity>
    );
  };

  const handelSetAsDefault = async () => {
    console.log('selectedDevice', selectedDevice);
    try {
      setIsDefaultSetLoading(true);
      if (!selectedDevice)
        return ToastService.show({
          message: 'Select a printer first',
          type: 'error',
          position: 'top',
        });
      await setAsDefaultPrinter(selectedDevice);
      ToastService.show({
        message: 'Default printer set successfully',
        type: 'success',
        position: 'top',
      });
    } catch (error) {
    } finally {
      setIsDefaultSetLoading(false);
    }
  };

  const handleSetPrinter = async () => {
    if (!selectedDevice) console.log('selectedDevice', selectedDevice);
    return ToastService.show({
      message: 'Select a printer first',
      type: 'error',
      position: 'top',
    });
    try {
      setIsSetLoading(true);
      setSelectedPrinter(selectedDevice);
      ToastService.show({
        message: 'Printer set successfully',
        type: 'success',
        position: 'top',
      });
    } catch (error) {
    } finally {
      setIsSetLoading(false);
    }
  };

  return (
    <Layout>
      <SecondaryHeader
        title="Printer Setup"
        isSearch={false}
        isQuestion={false}
        isNotification={false}
      />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ScanLoader />
        </View>
      ) : (
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={styles.container}
          data={printers}
          keyExtractor={(_, index) => index + 'contents'}
          renderItem={renderDevice}
        />
      )}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          disabled={isDefaultSetLoading || isLoading}
          onPress={handelSetAsDefault}
          style={{
            backgroundColor: '#007AFF',
            paddingHorizontal: padding(16),
            paddingVertical: padding(12),
            borderRadius: 12,
          }}>
          {isDefaultSetLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text
              style={{
                fontSize: font(16),
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'center',
              }}>
              Set as Default
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isSetLoading || isLoading}
          onPress={handleSetPrinter}
          style={{
            backgroundColor: '#007AFF',
            paddingHorizontal: padding(16),
            paddingVertical: padding(12),
            borderRadius: 12,
          }}>
          {isSetLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text
              style={{
                fontSize: font(16),
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'center',
              }}>
              Set Printer
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default PrinterSetup;

const styles = StyleSheet.create({
  container: {
    padding: padding(16),
  },
  card: {
    padding: padding(16),
    borderRadius: 12,
    backgroundColor: '#F4F4F4',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  selectedCard: {
    backgroundColor: '#D1E7FF',
    borderColor: '#007AFF',
  },

  deviceName: {
    fontSize: font(16),
    fontWeight: 'bold',
    color: '#000',
  },

  deviceAddress: {
    fontSize: font(14),
    color: '#555',
    marginTop: 4,
  },
  bottomButtonContainer: {
    paddingHorizontal: padding(16),
    paddingVertical: padding(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
