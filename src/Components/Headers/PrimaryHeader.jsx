import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Octicons from '@react-native-vector-icons/octicons';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {
  font,
  gap,
  heightResponsive,
  icon,
  padding,
  widthResponsive,
} from '../../utils/responsive';
import {useAuth} from '../../Contexts/AuthContext';
import {greeting} from '../../utils/validator';

const PrimaryHeader = memo(() => {
  const {name} = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          source={require('./../../../asset/images/profile.png')}
          style={styles.image}
        />
        <View>
          <Text style={styles.text}>{greeting()}</Text>
          <Text style={styles.name}>{name}</Text>
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
    paddingHorizontal: padding(16),
    backgroundColor: '#fff',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gap(10),
  },
  image: {
    width: icon(48),
    height: icon(48),
  },
  text: {
    fontSize: font(11),
    fontFamily: fonts.onMedium,
  },
  name: {
    fontSize: font(16),
    fontFamily: fonts.onSemiBold,
    color: colors.primary,
  },
  dot: {
    position: 'absolute',
    width: widthResponsive(10),
    height: heightResponsive(10),
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
