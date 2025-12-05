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
import Octicons from '@react-native-vector-icons/octicons';

const plans = [
  {
    id: 'free',
    name: 'Free Plan',
    price: 0,
    unit: '/ Year',
    features: [
      {label: 'Unlimited Billing (Up to 14 Days)', value: true},
      {label: 'WhatsApp Invoice Sharing', value: true},
      {label: 'Sales Analytics', value: true},
      {label: 'SMS Sending', value: false},
      {label: 'Printer Included & Support', value: false},
    ],
  },
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 999,
    unit: '/ Year',
    features: [
      {label: 'Unlimited Billing', value: true},
      {label: 'WhatsApp Invoice Sharing', value: true},
      {label: 'Sales Analytics', value: true},
      {label: 'SMS Sending', value: true},
      {label: 'Printer Included & Support', value: false},
    ],
  },
  {
    id: 'pro',
    name: 'Pro Plan (Includes Setup & Printer Charges)',
    price: 1499,
    unit: '/ Year',
    features: [
      {label: 'Unlimited Billing', value: true},
      {label: 'WhatsApp Invoice Sharing', value: true},
      {label: 'Sales Analytics', value: true},
      {label: 'SMS Sending', value: true},
      {label: 'Printer Included & Support', value: true},
    ],
  },
];

const Subscription = memo(() => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const buttonWidth = (ScreenWidth - padding(16) * 2 - gap(10) * 2) / plans.length;

  // Scroll when clicking bottom buttons
  const handleScrollTo = useCallback(pageIndex => {
    if (!scrollRef.current) return;
    setActiveIndex(pageIndex);
    scrollRef.current.scrollTo({
      x: pageIndex * ScreenWidth,
      y: 0,
      animated: true,
    });
  }, []);

  // Update active index when scrolling horizontally
  const handleMomentumScrollEnd = useCallback(
    e => {
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
        nestedScrollEnabled
        contentContainerStyle={styles.container}>
        {/* ===================================
            HORIZONTAL PLANS CARDS (DYNAMIC)
        ===================================*/}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={scrollRef}
          bounces
          snapToInterval={ScreenWidth}
          snapToAlignment="center"
          decelerationRate="fast"
          onMomentumScrollEnd={handleMomentumScrollEnd}
          style={styles.horizontainerContainer}
          scrollEventThrottle={16}>
          {plans.map(plan => (
            <View key={plan.id} style={styles.cardContainer}>
              <View style={styles.btnContainer}>
                <Text style={styles.btnText}>{plan.name}</Text>
              </View>

              <View style={styles.subscriptonContainer}>
                <View style={{padding: padding(16), justifyContent: 'center'}}>
                  <Text style={styles.featuresTitleText}>Premium Features</Text>
                </View>

                <DottedDivider marginVertical={0} />

                {plan.features.map((item, i) => (
                  <View key={i} style={styles.featuresContainer}>
                    <Text style={styles.featuresText}>{item.label}</Text>
                    <View style={styles.featuresTextContainer}>
                      {item.value ? (
                        <Octicons
                          name="check"
                          size={icon(20)}
                          color={colors.sucess}
                        />
                      ) : (
                        <Octicons
                          name="x"
                          size={icon(20)}
                          color={colors.error}
                        />
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonContainer}>
            {plans.map((plan, index) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.payBtn,
                  activeIndex === index && {borderColor: '#000'},
                ]}
                onPress={() => handleScrollTo(index)}>
                <Text style={styles.payBtnTitleText}>{plan.name}</Text>

                <View style={styles.textCOntainer}>
                  <Text style={styles.moneyText}>₹{plan.price}</Text>
                  <Text style={styles.moneyText}>{plan.unit}</Text>
                </View>

                {plan.compareAt && (
                  <Text
                    style={[
                      styles.monthText,
                      {fontSize: font(14), marginTop: -5},
                    ]}>
                    {plan.compareAt}
                  </Text>
                )}

                {plan.save && (
                  <Text style={styles.saveText}>Save {plan.save}</Text>
                )}
              </TouchableOpacity>
            ))}
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

// =============================
//     STYLES (UNCHANGED)
// =============================
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
    paddingBottom: padding(10),
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
    width: `${100 / plans.length - gap(1) || 100}%`,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: padding(16),
    paddingTop: padding(10),
    borderWidth: 1,
    borderRadius: icon(8),
    borderColor: colors.border,
    gap: gap(6),
  },
  payBtnTitleText: {
    fontSize: font(12),
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
  featuresTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gap(5),
  },
});

export default Subscription;
