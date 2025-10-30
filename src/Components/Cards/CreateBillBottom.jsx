import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import Ionicons from '@react-native-vector-icons/ionicons';

// const {width} = Dimensions.get('screen');

const CreateBillBottom = memo(({totalAmount = 0, totalQuanity = 0}) => {
  const {width} = useWindowDimensions();

  const sizes = useMemo(() => {
    const bottomContainerPaddingH = width * 0.042;
    const bottomContainerPaddingV = width * 0.05;
    const bottomCOntainerTitle = width * 0.026;
    const bottomCOntainerValue = width * 0.036;
    const bottomButtonHeight = width * 0.082;
    const bottomButtonPaddingH = width * 0.053;
    const bottomButtonText = width * 0.032;
    const bottomButtonContainerGap = width * 0.026;
    const iconSize = width * 0.024;

    return {
      bottomContainerPaddingH,
      bottomContainerPaddingV,
      bottomCOntainerTitle,
      bottomCOntainerValue,
      bottomButtonHeight,
      bottomButtonPaddingH,
      bottomButtonText,
      bottomButtonContainerGap,
      iconSize,
    };
  }, [width]);

  return (
    <View
      style={[
        styles.bottomContainer,
        {
          paddingVertical: sizes.bottomContainerPaddingV,
          paddingHorizontal: sizes.bottomContainerPaddingH,
        },
      ]}>
      <View style={styles.bottomContainerSub}>
        <Text
          style={[
            styles.bottomCOntainerTitle,
            {fontSize: sizes.bottomCOntainerTitle},
          ]}>
          Total Amount
        </Text>
        <Text
          style={[
            styles.bottomCOntainerValue,
            {fontSize: sizes.bottomCOntainerValue},
          ]}>
          ₹ {totalAmount.toFixed(2)}
        </Text>
      </View>
      <View style={styles.bottomContainerSub}>
        <Text
          style={[
            styles.bottomCOntainerTitle,
            {fontSize: sizes.bottomCOntainerTitle},
          ]}>
          Item's Quantity
        </Text>
        <Text
          style={[
            styles.bottomCOntainerValue,
            {fontSize: sizes.bottomCOntainerValue, textAlign: 'right'},
          ]}>
          {totalQuanity}
        </Text>
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            {
              backgroundColor: colors.sucess + 15,
              paddingHorizontal: sizes.bottomButtonPaddingH,
              height: sizes.bottomButtonHeight,
            },
          ]}>
          <Text style={[styles.bottomButtonText, {color: colors.sucess}]}>
            CASH
          </Text>
          <Ionicons name="caret-down" size={8} color={colors.sucess} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            {
              paddingHorizontal: sizes.bottomButtonPaddingH,
              height: sizes.bottomButtonHeight,
            },
          ]}>
          <Text style={[styles.bottomButtonText, {color: '#fff'}]}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: '#fff',
    width: '100%',
    // height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 16,
    // paddingTop: 10,
    // paddingBottom: 20,
  },
  bottomContainerSub: {
    gap: 5,
  },
  bottomCOntainerTitle: {
    fontSize: 10,
    fontFamily: fonts.inRegular,
    color: '#00000080',
  },
  bottomCOntainerValue: {
    // fontSize: 16,
    fontFamily: fonts.inBold,
    color: '#000',
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  bottomButton: {
    // height: 31,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    // paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 5,
  },
  bottomButtonText: {
    fontSize: 12,
    fontFamily: fonts.inBold,
  },
});

export default CreateBillBottom;
