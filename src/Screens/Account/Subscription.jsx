import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useCallback, useRef, useState} from 'react';
import {Layout} from '../Layout';
import {DottedDivider, SecondaryHeader} from '../../Components';
import {
  font,
  gap,
  icon,
  margin,
  padding,
  ScreenWidth,
} from '../../utils/responsive';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Lucide from '@react-native-vector-icons/lucide';

const Subscription = memo(() => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollTo = useCallback(pageIndex => {
    if (!scrollRef.current) return;
    setActiveIndex(pageIndex);
    scrollRef.current.scrollTo({
      x: pageIndex * ScreenWidth,
      y: 0,
      animated: true,
    });
  }, []);

  const handleMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const newIndex = Math.round(offsetX / ScreenWidth);
      if (newIndex !== activeIndex) setActiveIndex(newIndex);
    },
    [activeIndex],
  );

  return (
    <Layout>
      <SecondaryHeader title="Subscription" isSearch={false} />
      <ScrollView
        style={{flex: 1}}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={scrollRef}
          bounces={true}
          snapToInterval={ScreenWidth}
          snapToAlignment="center"
          decelerationRate="fast"
          onMomentumScrollEnd={handleMomentumScrollEnd}
          style={styles.horizontainerContainer}
          scrollEventThrottle={16}>
          <View style={styles.cardContainer}>
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>Monthly</Text>
            </View>
            <View style={styles.subscriptonContainer}>
              <View style={{padding: padding(16), justifyContent: 'center'}}>
                <Text style={styles.featuresTitleText}>Premium Features</Text>
              </View>
              <DottedDivider marginVertical={0} />
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresText}>Billing limit</Text>
                <Text style={styles.featuresText}>Unlimited</Text>
              </View>
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresText}>Whatsapp SMS</Text>
                <Text style={styles.featuresText}>100/day</Text>
              </View>
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresText}>Transaction SMS</Text>
                <Text style={styles.featuresText}>500/day</Text>
              </View>
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresText}>Report generation</Text>
                <Text style={styles.featuresText}>Upto 90 days</Text>
              </View>
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresText}>User management</Text>
                <Text style={styles.featuresText}>Limit access</Text>
              </View>
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresText}>Call & chat support</Text>
                <Text style={styles.featuresText}>24/7</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>Annual Plan</Text>
            </View>
            <View style={styles.subscriptonContainer}>
              <View style={{padding: padding(16), justifyContent: 'center'}}>
                <Text style={styles.featuresTitleText}>Premium Features</Text>
              </View>
              <DottedDivider marginVertical={0} />
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresText}>Billing limit</Text>
                <Text style={styles.featuresText}>Unlimited</Text>
              </View>
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresText}>Whatsapp SMS</Text>
                <Text style={styles.featuresText}>1000/day</Text>
              </View>
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresText}>Transaction SMS</Text>
                <Text style={styles.featuresText}>10000/day</Text>
              </View>
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresText}>Report generation</Text>
                <Text style={styles.featuresText}>Upto 365 days</Text>
              </View>
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresText}>User management</Text>
                <Text style={styles.featuresText}>Full access</Text>
              </View>
              <View style={styles.featuresContainer}>
                <Text style={styles.featuresText}>Call & chat support</Text>
                <Text style={styles.featuresText}>24/7</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.payBtn,
                activeIndex === 0 && {borderColor: '#000'},
              ]}
              onPress={() => handleScrollTo(0)}>
              <Text style={styles.payBtnTitleText}>Monthly</Text>
              <View style={styles.textCOntainer}>
                <Text style={styles.moneyText}>₹99</Text>
                <Text style={styles.moneyText}>/ month</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.payBtn,
                activeIndex === 1 && {borderColor: '#000'},
              ]}
              onPress={() => handleScrollTo(1)}>
              <Text style={styles.payBtnTitleText}>Annual</Text>
              <View style={styles.textCOntainer}>
                <Text style={styles.moneyText}>₹83.25</Text>
                <Text style={styles.moneyText}>/ month</Text>
              </View>
              <Text
                style={[styles.monthText, {fontSize: font(14), marginTop: -5}]}>
                ₹999 / month
              </Text>
              <Text style={styles.saveText}>Save 18%</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.subscribeBtn}>
            <Text style={styles.subscribeBtnText}>Subscribe & Pay</Text>
            <Lucide name="wallet" color={'#fff'} size={icon(20)} />
          </TouchableOpacity>
          <View style={styles.noteContainer}>
            <Text style={[styles.noteText, {color: 'red'}]}>*</Text>
            <Text style={styles.noteText}>
              By proceeding, you consent to recurring billing for your selected
              plan. Subscriptions renew automatically until cancelled. And so
              payments are processed securely and are non-refundable.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: padding(16),
  },
  cardContainer: {
    width: ScreenWidth,
    paddingHorizontal: padding(16),
    gap: gap(16),
  },
  btnContainer: {
    width: '100%',
    height: icon(46),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: icon(8),
  },
  btnText: {
    color: '#fff',
    fontSize: font(16),
    fontFamily: fonts.inBold,
  },
  horizontainerContainer: {},
  subscriptonContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  featuresContainer: {
    paddingVertical: padding(10),
    paddingHorizontal: padding(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuresTitleText: {
    fontSize: font(16),
    fontFamily: fonts.inMedium,
  },
  featuresText: {
    fontSize: font(14),
    fontFamily: fonts.inRegular,
  },
  bottomContainer: {
    backgroundColor: '#fff',
    width: '100%',
    paddingHorizontal: padding(16),
    paddingTop: padding(10),
    paddingBottom: padding(20),
    marginVertical: margin(30),
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payBtn: {
    height: icon(90),
    width: '48%',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: padding(16),
    paddingTop: padding(10),
    borderWidth: 1,
    borderRadius: icon(8),
    borderColor: colors.border,
    gap: gap(6),
  },
  payBtnTitleText: {
    fontSize: font(14),
    fontFamily: fonts.inRegular,
  },
  textCOntainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gap(5),
  },
  moneyText: {
    fontSize: font(16),
    fontFamily: fonts.inMedium,
  },
  saveText: {
    position: 'absolute',
    top: padding(10),
    right: padding(10),
    backgroundColor: colors.sucess + 20,
    paddingTop: padding(3),
    paddingHorizontal: padding(10),
    borderRadius: 3,
    borderWidth: 0.25,
    borderBottomColor: colors.sucess,
  },
  subscribeBtn: {
    width: '100%',
    paddingVertical: padding(16),
    marginVertical: margin(16),
    backgroundColor: '#000',
    flexDirection: 'row',
    gap: gap(11),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  subscribeBtnText: {
    fontSize: font(16),
    fontFamily: fonts.inSemiBold,
    color: '#fff',
  },
  noteContainer: {
    flexDirection: 'row',
  },
  noteText: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: fonts.inRegular,
  },
});

export default Subscription;
