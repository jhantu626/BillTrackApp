import {
  Linking,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import DottedDivider from '../Dividers/DottedDivider';
import Lucide from '@react-native-vector-icons/lucide';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {gap, padding, font, icon} from '../../utils/responsive';
import {formatDate} from '../../utils/helper';

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
        <TouchableOpacity style={styles.subBottomContainer}>
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
