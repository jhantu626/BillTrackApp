import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import DottedDivider from '../Dividers/DottedDivider';
import Lucide from '@react-native-vector-icons/lucide';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';

const InvoiceCard = memo(({invoice}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.tsText}>{invoice?.ts}</Text>
          <Text style={styles.numberText}>{invoice?.invoiceNumber}</Text>
        </View>
        <Text style={styles.dateText}>{invoice?.date}</Text>
        <View style={styles.right}>
          <View style={styles.paidContainer}>
            <Text style={styles.paidText}>{invoice?.status}</Text>
          </View>
          <Text style={styles.priceText}>₹ {invoice?.amount}</Text>
        </View>
      </View>
      <DottedDivider />
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.subBottomContainer}>
          <Lucide name="message-square-text" size={20} color={'#007aff'} />
          <Text style={[{color: '#007aff'}, styles.subBottomContainerText]}>
            SMS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subBottomContainer}>
          <Ionicons name="logo-whatsapp" size={20} color={'#04bd01'} />
          <Text style={[{color: '#04bd01'}, styles.subBottomContainerText]}>
            Whatsapp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subBottomContainer}>
          <Lucide name="printer" size={20} color={'#ff393c'} />
          <Text style={[{color: '#ff393c'}, styles.subBottomContainerText]}>
            Print
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subBottomContainer}
          onPress={() => {
            navigation.navigate('InvoiceDetails');
          }}>
          <Lucide name="eye" size={20} color={'#00000090'} />
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
    paddingVertical: 10,
  },
  container: {
    // height: 65,
    // borderRadius: 5,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    gap: 6,
  },
  tsText: {
    fontSize: 14,
    fontFamily: fonts.inBold,
    color: colors.primary,
  },
  numberText: {
    fontSize: 12,
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
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  paidText: {
    fontSize: 8,
    fontFamily: fonts.inSemiBold,
    color: colors.sucess,
  },
  priceText: {
    fontSize: 16,
    fontFamily: fonts.inSemiBold,
    color: '#000000',
  },
  dateText: {
    fontSize: 10,
    fontFamily: fonts.inRegular,
    color: '#00000080',
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  subBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  subBottomContainerText: {
    fontSize: 12,
    fontFamily: fonts.inBold,
  },
});
