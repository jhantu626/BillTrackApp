import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import Ionicons from '@react-native-vector-icons/ionicons';

const CreateBillBottom = memo(({totalAmount = 0, totalQuanity = 0}) => {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomContainerSub}>
        <Text style={styles.bottomCOntainerTitle}>Total Amount</Text>
        <Text style={styles.bottomCOntainerValue}>
          ₹ {totalAmount.toFixed(2)}
        </Text>
      </View>
      <View style={styles.bottomContainerSub}>
        <Text style={styles.bottomCOntainerTitle}>Item's Quantity</Text>
        <Text style={styles.bottomCOntainerValue}>{totalQuanity}</Text>
      </View>
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            {
              backgroundColor: colors.sucess + 15,
            },
          ]}>
          <Text style={[styles.bottomButtonText, {color: colors.sucess}]}>
            CASH
          </Text>
          <Ionicons name="caret-down" size={8} color={colors.sucess} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton}>
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
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
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
    fontSize: 16,
    fontFamily: fonts.inBold,
    color: '#000',
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  bottomButton: {
    height: 31,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 5,
  },
  bottomButtonText: {
    fontSize: 12,
    fontFamily: fonts.inBold,
  },
});

export default CreateBillBottom;
