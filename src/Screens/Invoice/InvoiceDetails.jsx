import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, { useMemo } from 'react';
import {Layout} from '../Layout';
import {DottedDivider, SecondaryHeader} from '../../Components';
import {fonts} from '../../utils/fonts';

const InvoiceDetails = () => {
  const invoiceData = {
    businessName: 'Floop Product Of Turain',
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

  return (
    <Layout>
      <SecondaryHeader
        title="Invoice Details"
        isNotification={false}
        isQuestion={false}
        isSearch={false}
      />
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 20}}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Image
              source={invoiceData.businessLogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.businessText}>{invoiceData.businessName}</Text>
            <View style={styles.topKeyValueStyle}>
              <Text style={styles.keyText}>Phone Numer: </Text>
              <Text style={styles.valueText}>{invoiceData.businessPhone}</Text>
            </View>
            <View style={styles.topKeyValueStyle}>
              <Text style={styles.keyText}>Address: </Text>
              <Text style={[styles.valueText, {width: '50%'}]}>
                {invoiceData.businessAddress}
              </Text>
            </View>
            <View style={styles.topKeyValueStyle}>
              <Text style={styles.keyText}>GST NO : </Text>
              <Text style={styles.valueText}>{invoiceData.businessGstNo}</Text>
            </View>
          </View>
          <DottedDivider borderWidth={0.8} />
          <View style={styles.secondContainer}>
            <View style={styles.subSecondContainer}>
              <Text style={styles.invoiceText}>
                Invoice No : {invoiceData.invoiceNumber}{' '}
              </Text>
              <Text style={styles.invoiceText}>
                Date : {invoiceData.invoiceDate}{' '}
              </Text>
            </View>
            <View style={styles.subSecondContainer}>
              <Text style={styles.invoiceText}>
                Billed By : {invoiceData.billedBy}
              </Text>
              <Text style={styles.invoiceText}>
                Time : {invoiceData.invoiceTime}
              </Text>
            </View>
          </View>
          <DottedDivider borderWidth={0.8} />
          <View style={styles.secondContainer}>
            <View style={styles.subSecondContainer}>
              <Text style={styles.invoiceText}>
                Name : {invoiceData.customerName}
              </Text>
            </View>
            <View style={styles.subSecondContainer}>
              <Text style={styles.invoiceText}>
                Number : {invoiceData.customerPhone}
              </Text>
            </View>
          </View>
          <DottedDivider borderWidth={0.8} />
          <View style={styles.itemCotainer}>
            <Text style={[styles.invoiceTitle, {width: '35%'}]}>Name</Text>
            <Text
              style={[styles.invoiceTitle, {width: '20%', textAlign: 'right'}]}>
              Quantity
            </Text>
            <Text
              style={[styles.invoiceTitle, {width: '20%', textAlign: 'right'}]}>
              Price
            </Text>
            <Text
              style={[styles.invoiceTitle, {width: '20%', textAlign: 'right'}]}>
              Amount
            </Text>
          </View>
          <DottedDivider borderWidth={0.8} />
          {invoiceData.items.map((item, index) => (
            <View style={styles.itemCotainer} key={index + '_item'}>
              <Text style={[styles.invoiceItem, {width: '40%'}]}>
                {item.name}
              </Text>
              <Text
                style={[
                  styles.invoiceItem,
                  {width: '20%', textAlign: 'right'},
                ]}>
                {item.quantity}
              </Text>
              <Text
                style={[
                  styles.invoiceItem,
                  {width: '20%', textAlign: 'right'},
                ]}>
                ₹{item.price}
              </Text>
              <Text
                style={[
                  styles.invoiceTitle,
                  {width: '20%', textAlign: 'right'},
                ]}>
                ₹{item.price * item.quantity}
              </Text>
            </View>
          ))}
          <DottedDivider borderWidth={0.8} />
          <View style={styles.secondContainer}>
            <View style={styles.subSecondContainer}>
              <Text style={styles.invoiceText}>Total Quantity : 10</Text>
            </View>
            <View style={styles.subSecondContainer}>
              <Text style={styles.invoiceText}>Sub Total : 1340.95</Text>
            </View>
          </View>
          <DottedDivider borderWidth={0.8} />
          <View style={styles.secondContainer}>
            <View style={styles.subSecondContainer}>
              <Text style={styles.invoiceText}>1280.95 @ CGST - 2.5%</Text>
              <Text style={styles.invoiceText}>1280.95 @ SGST - 2.5%</Text>
              <Text style={styles.invoiceText}>Round Off</Text>
            </View>
            <View style={styles.subSecondContainer}>
              <Text style={styles.invoiceText}>₹32.02</Text>
              <Text style={styles.invoiceText}>₹32.02</Text>
              <Text style={styles.invoiceText}>₹0.01</Text>
            </View>
          </View>
          <DottedDivider borderWidth={0.8} />
          <View style={styles.secondContainer}>
            <View style={styles.subSecondContainer}>
              <Text style={[styles.invoiceText, {fontSize: 15}]}>
                Payment : Cash
              </Text>
            </View>
            <View style={styles.subSecondContainer}>
              <Text style={[styles.invoiceText, {fontSize: 15}]}>
                Total Amount : ₹1405.00
              </Text>
            </View>
          </View>
          <DottedDivider borderWidth={0.8} />
          <Text style={styles.thankYouText}>Thank You & Visit Again</Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingBottom: 10,
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    gap: 7,
  },
  logo: {
    height: 24,
    tintColor: '#00000090',
  },
  businessText: {
    fontSize: 20,
    fontFamily: fonts.onBold,
    color: '#000',
  },
  topKeyValueStyle: {
    flexDirection: 'row',
    gap: 5,
  },
  keyText: {
    fontSize: 14,
    fontFamily: fonts.onSemiBold,
    color: '#000',
  },
  valueText: {
    fontSize: 14,
    fontFamily: fonts.onMedium,
    color: '#000',
  },
  secondContainer: {
    marginVertical: 5,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subSecondContainer: {
    gap: 10,
  },
  invoiceText: {
    fontSize: 14,
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
    fontSize: 14,
    fontFamily: fonts.inBold,
    color: '#000000',
  },
  invoiceItem: {
    fontSize: 14,
    fontFamily: fonts.inMedium,
    color: '#000000',
  },
  gstSecondContainer: {
    gap: 5,
  },
  thankYouText: {
    fontSize: 15,
    fontFamily: fonts.inBold,
    color: '#000000',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default InvoiceDetails;
