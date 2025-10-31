import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import AntDesign from '@react-native-vector-icons/ant-design';
import {font, padding} from './../../utils/responsive';

const ProfileCard = memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          source={require('./../../../asset/images/profile.png')}
          style={styles.image}
        />
        <View style={styles.leftRightContainer}>
          <Text style={styles.nameText}>Pritam Bala</Text>
          <Text style={styles.numberText}>9775746484</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.editBtn}>
        <AntDesign name="edit" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: padding(16),
    // backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  leftRightContainer: {
    // gap: ,
  },
  nameText: {
    fontSize: font(18),
    fontFamily: fonts.popSemiBold,
  },
  numberText: {
    fontSize: font(14),
    fontFamily: fonts.popRegular,
  },
  editBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileCard;
