import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Octicons from '@react-native-vector-icons/octicons';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

const PrimaryHeader = memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          source={require('./../../../asset/images/profile.png')}
          style={styles.image}
        />
        <View>
          <Text style={styles.text}>Good Morning</Text>
          <Text style={styles.name}>Pritam Bala</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.rightContainer}>
        <Octicons name="bell" size={24} />
        <View style={styles.dot} />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 48,
    height: 48,
  },
  text: {
    fontSize: 11,
    fontFamily: fonts.onMedium,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.onSemiBold,
    color: colors.primary,
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: colors.primary,
    right: 0,
    top: 0,
  },
  rightContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrimaryHeader;
