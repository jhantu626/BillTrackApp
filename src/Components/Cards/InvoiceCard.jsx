import {
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import DottedDivider from '../Dividers/DottedDivider';
import Lucide from '@react-native-vector-icons/lucide';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {gap, padding, font, icon} from '../../utils/responsive';
import {calculateInvoiceData, formatDate} from '../../utils/helper';
import {usePrinter} from '../../Contexts/PrinterContext';
import printerService from '../../utils/PrinterService';
import {invoiceService} from '../../Services/InvoiceService';
import {
  useAuth,
  useBusiness,
  useSubscription,
} from '../../Contexts/AuthContext';

// const {width} = Dimensions.get('screen');

const InvoiceCard = ({invoice}) => {
  const {setIsLoading} = useAuth();
  const {printer} = usePrinter();
  const business = useBusiness();
  const plan = useSubscription('plan');
  const isActivePlan = useSubscription('isActive');

  const [isPrintingLoading, setIsPrintingLoading] = useState(false);

  const navigation = useNavigation();
  const sendToWhatsApp = async () => {
    // Safety check
    if (!invoice?.customerNumber) {
      ToastAndroid.show('Customer mobile number not found', ToastAndroid.SHORT);
      return;
    }

    // Make sure phone number is in international format
    let phoneNumber = invoice.customerNumber.trim();

    // If number doesn't start with +, and it's 10 digits (Indian), add +91
    if (!phoneNumber.startsWith('+')) {
      if (phoneNumber.length === 10) {
        phoneNumber = '+91' + phoneNumber;
      } else {
        phoneNumber = '+' + phoneNumber; // fallback
      }
    }

    // Your beautiful WhatsApp message
    const message = `Invoice Paid – Thank You!

*${business?.name}*

━━━━━━━━━━━━━━━━━
Invoice No.:   ${invoice?.invoiceNumber}
Date:              ${formatDate(invoice?.createdAt)}
Customer:      ${invoice?.customerNumber}
Amount Paid:  ₹${invoice?.totalAmount}
Paid via:          ${invoice?.paymentMode || 'Cash'}
━━━━━━━━━━━━━━━━━

Thank you for your payment!

Download Invoice:
https://billtrack.co.in/${invoice?.invoiceNumber}

Need help? Just reply here.

Warm regards,
Team ${business?.name}`;

    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message,
    )}`;

    try {
      const canOpen = await Linking.canOpenURL(whatsappUrl);

      if (canOpen) {
        await Linking.openURL(whatsappUrl);
      } else {
        // Fallback to web if WhatsApp app not installed
        const webUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message,
        )}`;
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.log('WhatsApp Error:', error);
      Alert.alert(
        'WhatsApp Not Found',
        'Please install WhatsApp to share invoice.',
      );
    }
  };

  const printBill = async () => {
    try {
      setIsPrintingLoading(true);
      if (!printer) {
        Alert.alert(
          'Printer Not Selected',
          'To continue, please set up a printer:\n\n1. Open the Accounts section.\n2. Go to Settings.\n3. Choose Printer Setup.\n4. Add or select an available printer.',
          [{text: 'OK', style: 'default'}],
        );

        return;
      }
      const invoiceItems = await invoiceService.getInvoiceItems(invoice?.id);
      const {gstListCalculate, items, subTotalAmount, totalQuantity} =
        calculateInvoiceData(invoiceItems?.items);
      await printerService.printInvoice(
        printer,
        invoice,
        items,
        gstListCalculate,
        totalQuantity,
        subTotalAmount,
        business,
      );
    } catch (error) {
    } finally {
      setIsPrintingLoading(false);
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
          onPress={sendToWhatsApp}>
          <Ionicons name="logo-whatsapp" size={icon(18)} color={'#04bd01'} />
          <Text style={[{color: '#04bd01'}, styles.subBottomContainerText]}>
            Whatsapp
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subBottomContainer}
          onPress={printBill}
          disabled={isPrintingLoading}>
          <Lucide name="printer" size={icon(18)} color={'#ff393c'} />
          {isPrintingLoading ? (
            <ActivityIndicator color={'#ff393c'} size={'small'} />
          ) : (
            <Text style={[{color: '#ff393c'}, styles.subBottomContainerText]}>
              Print
            </Text>
          )}
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
};

export default memo(InvoiceCard);

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
