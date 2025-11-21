import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {Layout} from '../Layout';
import {DottedDivider, SecondaryHeader} from '../../Components';
import {fonts} from '../../utils/fonts';
import {useBusiness} from '../../Contexts/AuthContext';
import {useRoute} from '@react-navigation/native';
import {invoiceService} from '../../Services/InvoiceService';
import {API_URL} from '../../utils/config';
import {icon} from '../../utils/responsive';
import {formatDate, formatTime12Hour} from '../../utils/helper';
import {parse} from 'react-native-svg';

const InvoiceDetails = () => {
  // ROUTE - NAVIGATION
  const route = useRoute();
  const {invoice} = route.params;
  console.log('invoice', JSON.stringify(invoice));
  const business = useBusiness();
  console.log('business', JSON.stringify(business));
  const invoiceData = {
    businessName: 'Turain Software',
    businessPhone: '+91 6290 397200',
    businessAddress: '2/25 Poddarnagar, Kolkata, West Bengal - 700046',
    businessGstNo: '19YWFAS0292L8Z8',
    businessLogo: require('./../../../asset/images/logo.png'),

    invoiceNumber: 'TS252612531',
    invoiceDate: '24-10-2025',
    invoiceTime: '11:25 AM',
    billedBy: 'Turain',

    customerName: 'Turain',
    customerPhone: '62903 97293',

    cgstRate: 0.025, // 2.5%
    sgstRate: 0.025, // 2.5%

    paymentMethod: 'Cash',

    items: [
      {name: 'Chicken Biryani', quantity: 2, price: 250},
      {name: 'Paneer Butter Masala', quantity: 1, price: 220},
      {name: 'Butter Naan', quantity: 4, price: 40},
      {name: 'Coke 500ml', quantity: 2, price: 35},
      {name: 'Gulab Jamun', quantity: 3, price: 25},
      {name: 'Chicken Kebab', quantity: 1, price: 180},
    ],
  };

  // STATE VARIABLES
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [gstList, setGstList] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [subTotalAmount, setSubTotalAmount] = useState(0);

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  const {width} = useWindowDimensions();

  const sizes = useMemo(() => {
    const logoHeight = width * 0.065;
    const logoWidth = width * 0.22;

    // Font sizes
    const businessTextFontSize = width * 0.053; // 20
    const keyTextFontSize = width * 0.037; // 14
    const valueTextFontSize = width * 0.037; // 14
    const invoiceTextFontSize = width * 0.037; // 14
    const invoiceTitleFontSize = width * 0.037; // 14
    const invoiceItemFontSize = width * 0.037; // 14
    const thankYouTextFontSize = width * 0.04; // 15

    // Paddings
    const containerPaddingBottom = width * 0.026; // 10
    const topContainerPaddingVertical = width * 0.08; // 30
    const secondContainerPaddingHorizontal = width * 0.042; // 16
    const itemContainerPaddingHorizontal = width * 0.042; // 16

    // Margins
    const containerMarginTop = width * 0.053; // 20
    const itemContainerMarginVertical = width * 0.013; // 5

    // Spacing / gaps
    const topContainerGap = width * 0.018; // 7
    const subSecondContainerGap = width * 0.026; // 10

    return {
      logoHeight,
      logoWidth,
      businessTextFontSize,
      keyTextFontSize,
      valueTextFontSize,
      invoiceTextFontSize,
      invoiceTitleFontSize,
      invoiceItemFontSize,
      thankYouTextFontSize,
      containerPaddingBottom,
      topContainerPaddingVertical,
      secondContainerPaddingHorizontal,
      itemContainerPaddingHorizontal,
      containerMarginTop,
      itemContainerMarginVertical,
      topContainerGap,
      subSecondContainerGap,
    };
  }, [width]);

  console.log('invoiceItems');

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const data = await invoiceService.getInvoiceItems(invoice.id);
      console.log('invoice items', JSON.stringify(data));
      if (data?.status) {
        let items = [];
        const gstListCalculate = [];
        data?.items.forEach(item => {
          const rate = parseFloat(item?.rate);
          let actualRate;
          const quantity = Number(item?.quantity);
          setTotalQuantity(prev => prev + quantity);

          if (item?.gstType !== null && item?.gstPercentage !== 0) {
            const gstPercentage = parseFloat(item?.gstPercentage);

            // Correct formula: actualRate = rate / (1 + gstPercentage/100)
            actualRate = rate / (1 + gstPercentage / 100);

            // GST amount is the difference
            const gstAmount = rate - actualRate;

            gstListCalculate.push({
              gstType: 'CGST',
              gstPercentage: gstPercentage / 2,
              gstAmount: (gstAmount / 2) * quantity,
              rate: actualRate * quantity,
            });

            gstListCalculate.push({
              gstType: 'SGST',
              gstAmount: (gstAmount / 2) * quantity,
              gstPercentage: gstPercentage / 2,
              rate: actualRate * quantity,
            });
          } else {
            actualRate = rate;
          }


          setSubTotalAmount(prev => prev + actualRate * Number(item?.quantity));
          items.push({
            name: item?.productName,
            quantity: item?.quantity,
            rate: actualRate,
          });
        });


        setInvoiceItems(items);
        setGstList(gstListCalculate);
        console.log('final Items', JSON.stringify(items));
        console.log('gstList', JSON.stringify(gstListCalculate));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [invoice]);

  return (
    <Layout>
      <SecondaryHeader
        title="Invoice Details"
        isNotification={false}
        isQuestion={false}
        isSearch={false}
      />
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 20}}>
        <View
          style={[
            styles.container,
            {
              paddingBottom: sizes.containerPaddingBottom,
              marginTop: sizes.containerMarginTop,
            },
          ]}>
          <View
            style={[
              styles.topContainer,
              {
                paddingVertical: sizes.topContainerPaddingVertical,
                gap: sizes.topContainerGap,
              },
            ]}>
            <Image
              source={{uri: `${API_URL}files/logo/${business?.logoUrl}`}}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.businessText,
                {fontSize: sizes.businessTextFontSize},
              ]}>
              {business?.name}
            </Text>
            {business?.phone && (
              <View style={styles.topKeyValueStyle}>
                <Text
                  style={[styles.keyText, {fontSize: sizes.keyTextFontSize}]}>
                  Phone Numer:{' '}
                </Text>
                <Text
                  style={[
                    styles.valueText,
                    {fontSize: sizes.valueTextFontSize},
                  ]}>
                  {invoiceData.businessPhone}
                </Text>
              </View>
            )}
            <View style={styles.topKeyValueStyle}>
              <Text style={[styles.keyText, {fontSize: sizes.keyTextFontSize}]}>
                Address:{' '}
              </Text>
              <Text
                style={[
                  styles.valueText,
                  {width: '50%', fontSize: sizes.valueTextFontSize},
                ]}>
                {business?.street}, {business?.city}, {business?.state},{' '}
                {business?.pinCode}
              </Text>
            </View>
            {business?.gstNumber && (
              <View style={styles.topKeyValueStyle}>
                <Text
                  style={[styles.keyText, {fontSize: sizes.keyTextFontSize}]}>
                  GST NO :{' '}
                </Text>
                <Text
                  style={[
                    styles.valueText,
                    {fontSize: sizes.valueTextFontSize},
                  ]}>
                  {business?.gstNumber}
                </Text>
              </View>
            )}
          </View>
          <DottedDivider borderWidth={0.8} />
          <View
            style={[
              styles.secondContainer,
              {paddingHorizontal: sizes.secondContainerPaddingHorizontal},
            ]}>
            <View
              style={[
                styles.subSecondContainer,
                {gap: sizes.subSecondContainerGap},
              ]}>
              <Text
                style={[
                  styles.invoiceText,
                  {fontSize: sizes.invoiceTextFontSize},
                ]}>
                Invoice No : {invoice.invoiceNumber}{' '}
              </Text>
              <Text
                style={[
                  styles.invoiceText,
                  {fontSize: sizes.invoiceTextFontSize},
                ]}>
                Date : {formatDate(invoice?.createdAt)}
              </Text>
            </View>
            <View style={styles.subSecondContainer}>
              <Text
                style={[
                  styles.invoiceText,
                  {fontSize: sizes.invoiceTextFontSize},
                ]}>
                {/* Billed By : {invoiceData.billedBy} */}
              </Text>
              <Text
                style={[
                  styles.invoiceText,
                  {fontSize: sizes.invoiceTextFontSize},
                ]}>
                Time : {formatTime12Hour(invoice?.createdAt)}
              </Text>
            </View>
          </View>
          {invoice?.customerNumber && <DottedDivider borderWidth={0.8} />}
          <View
            style={[
              styles.secondContainer,
              {paddingHorizontal: sizes.secondContainerPaddingHorizontal},
            ]}>
            {invoice.customerNumber && (
              <View style={styles.subSecondContainer}>
                <Text
                  style={[
                    styles.invoiceText,
                    {fontSize: sizes.invoiceTextFontSize},
                  ]}>
                  Customer : +91 {invoice?.customerNumber}
                </Text>
              </View>
            )}
          </View>
          <DottedDivider borderWidth={0.8} />
          <View style={styles.itemCotainer}>
            <Text
              style={[
                styles.invoiceTitle,
                {width: '35%', fontSize: sizes.invoiceTitleFontSize},
              ]}>
              Name
            </Text>
            <Text
              style={[
                styles.invoiceTitle,
                {
                  width: '20%',
                  textAlign: 'right',
                  fontSize: sizes.invoiceTitleFontSize,
                },
              ]}>
              Quantity
            </Text>
            <Text
              style={[
                styles.invoiceTitle,
                {
                  width: '20%',
                  textAlign: 'right',
                  fontSize: sizes.invoiceTitleFontSize,
                },
              ]}>
              Price
            </Text>
            <Text
              style={[
                styles.invoiceTitle,
                {
                  width: '20%',
                  textAlign: 'right',
                  fontSize: sizes.invoiceTitleFontSize,
                },
              ]}>
              Amount
            </Text>
          </View>
          <DottedDivider borderWidth={0.8} />
          {invoiceItems.map((item, index) => (
            <View style={styles.itemCotainer} key={index + '_item'}>
              <Text
                style={[
                  styles.invoiceItem,
                  {width: '40%', fontSize: sizes.invoiceItemFontSize},
                ]}>
                {item.name}
              </Text>
              <Text
                style={[
                  styles.invoiceItem,
                  {
                    width: '20%',
                    textAlign: 'right',
                    fontSize: sizes.invoiceItemFontSize,
                  },
                ]}>
                {item.quantity}
              </Text>
              <Text
                style={[
                  styles.invoiceItem,
                  {
                    width: '20%',
                    textAlign: 'right',
                    fontSize: sizes.invoiceItemFontSize,
                  },
                ]}>
                ₹{item.rate.toFixed(2)}
              </Text>
              <Text
                style={[
                  styles.invoiceTitle,
                  {
                    width: '20%',
                    textAlign: 'right',
                    fontSize: sizes.invoiceTitleFontSize,
                  },
                ]}>
                ₹{(Number(item.rate) * Number(item.quantity)).toFixed(2)}
              </Text>
            </View>
          ))}
          <DottedDivider borderWidth={0.8} />
          <View
            style={[
              [
                styles.secondContainer,
                {paddingHorizontal: sizes.secondContainerPaddingHorizontal},
              ],
            ]}>
            <View style={styles.subSecondContainer}>
              <Text
                style={[
                  styles.invoiceText,
                  {fontSize: sizes.invoiceTextFontSize},
                ]}>
                Total Quantity : {totalQuantity}
              </Text>
            </View>
            <View style={styles.subSecondContainer}>
              <Text
                style={[
                  styles.invoiceText,
                  {fontSize: sizes.invoiceTextFontSize},
                ]}>
                Sub Total : ₹{subTotalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
          <DottedDivider borderWidth={0.8} />
          {gstList.map((item, index) => (
            <View
              key={index + 'gst_list'}
              style={[
                styles.secondContainer,
                {paddingHorizontal: sizes.secondContainerPaddingHorizontal},
              ]}>
              <View style={styles.subSecondContainer}>
                <Text
                  style={[
                    styles.invoiceText,
                    {fontSize: sizes.invoiceTextFontSize},
                  ]}>
                  ₹{item?.rate.toFixed(2)} @ {item?.gstType} -{' '}
                  {item?.gstPercentage}%
                </Text>
              </View>
              <View style={styles.subSecondContainer}>
                <Text
                  style={[
                    styles.invoiceText,
                    {fontSize: sizes.invoiceTextFontSize},
                  ]}>
                  ₹{item?.gstAmount.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
          <DottedDivider borderWidth={0.8} />
          <View
            style={[
              styles.secondContainer,
              {paddingHorizontal: sizes.secondContainerPaddingHorizontal},
            ]}>
            <View style={styles.subSecondContainer}>
              <Text style={[styles.invoiceText, {fontSize: 15}]}>
                Payment : Cash
              </Text>
            </View>
            <View style={styles.subSecondContainer}>
              <Text
                style={[
                  styles.invoiceText,
                  {fontSize: sizes.invoiceTextFontSize},
                ]}>
                Total Amount : ₹{invoice.totalAmount}
              </Text>
            </View>
          </View>
          <DottedDivider borderWidth={0.8} />
          <Text style={[styles.thankYouText, {fontSize: sizes.thankYouText}]}>
            Thank You & Visit Again
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // marginTop: 20,
    // paddingBottom: 10,
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 30,
    // gap: 7,
  },
  logo: {
    width: icon(100),
    height: icon(100),
    // tintColor: '#00000090',
  },
  businessText: {
    fontFamily: fonts.onBold,
    color: '#000',
  },
  topKeyValueStyle: {
    flexDirection: 'row',
    gap: 5,
  },
  keyText: {
    fontFamily: fonts.onSemiBold,
    color: '#000',
  },
  valueText: {
    fontFamily: fonts.onMedium,
    color: '#000',
  },
  secondContainer: {
    marginVertical: 5,
    // paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subSecondContainer: {
    // gap: 10,
  },
  invoiceText: {
    fontFamily: fonts.inSemiBold,
    color: '#000000',
  },
  itemCotainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 5,
  },
  invoiceTitle: {
    fontFamily: fonts.inBold,
    color: '#000000',
  },
  invoiceItem: {
    fontFamily: fonts.inMedium,
    color: '#000000',
  },
  gstSecondContainer: {
    gap: 5,
  },
  thankYouText: {
    fontFamily: fonts.inBold,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default InvoiceDetails;
