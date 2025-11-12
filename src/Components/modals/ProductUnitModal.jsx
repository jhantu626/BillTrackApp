import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {font, icon, margin, padding} from '../../utils/responsive';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import Octicons from '@react-native-vector-icons/octicons';
import DottedDivider from '../Dividers/DottedDivider';
import ToastContainer from '../Toasts/ToastContainer';

const MAIN_UNITS = [
  {label: 'KG', value: 'kg'},
  {label: 'GM', value: 'gm'},
  {label: 'PCS', value: 'pcs'},
  {label: 'DOZEN', value: 'dozen'},
  {label: 'LITRE', value: 'ltr'},
  {label: 'ML', value: 'ml'},
  {label: 'PACK', value: 'pack'},
  {label: 'BOX', value: 'box'},
  {label: 'BAG', value: 'bag'},
  {label: 'BOTTLE', value: 'bottle'},
  {label: 'CARTON', value: 'carton'},
];

const ProductUnitModal = ({
  visible = false,
  handleCancel = () => {},
  value,
  setValue,
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Select a Unit</Text>
        </View>
        <FlatList
          style={{
            // flex: 1,
            backgroundColor: '#EAEAEA',
            marginVertical: margin(10),
            borderRadius: icon(10),
            marginHorizontal: margin(16),
            paddingBottom: padding(10),
          }}
          data={MAIN_UNITS}
          keyExtractor={(_, index) => index + 'unit_flatlist'}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.itemCOntainer}
                onPress={() => {
                  setValue(item.label);
                  handleCancel();
                }}>
                <Text style={styles.itemText}>{item.label}</Text>
                {value === item.label && (
                  <Octicons name="check" size={icon(20)} color={'#000'} />
                )}
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.contentContainer}
          ItemSeparatorComponent={() => <DottedDivider marginVertical={0} />}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: padding(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#000',
    paddingVertical: padding(6),
    paddingHorizontal: padding(10),
    borderRadius: 5,
  },
  cancelText: {
    color: '#fff',
    fontFamily: fonts.inMedium,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.inSemiBold,
  },
  contentContainer: {
    marginVertical: margin(10),
  },
  itemCOntainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: padding(10),
    paddingHorizontal: padding(16),
  },
  itemText: {
    fontSize: font(14),
    fontFamily: fonts.inMedium,
  },
});

export default ProductUnitModal;
