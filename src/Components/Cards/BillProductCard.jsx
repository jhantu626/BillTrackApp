import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import {fonts} from '../../utils/fonts';
import Lucide from '@react-native-vector-icons/lucide';
import {colors} from '../../utils/colors';

const BillProductCard = memo(({width = 113, item}) => {
  const PADDING = 8;
  console.info(JSON.stringify(item));

  useMemo(() => {
    imageWidth = width - PADDING * 2;
    imageHeight = (imageWidth * 3) / 4;
    titleFontSize = width * 0.106;
    priceFontSize = width * 0.124;
    buttonSize = width * 0.177;
    iconSize = width * 0.088;
    bottomMarginTop = width * 0.177;
  }, [width]);

  return (
    <Pressable style={[styles.container, {width: width}]}>
      <Image
        style={[styles.image, {height: imageHeight}]}
        source={
          item?.image
            ? item.image
            : require('./../../../asset/images/emptyimg.jpg')
        }
        resizeMode="cover"
      />
      <Text
        style={[styles.titleText, {fontSize: titleFontSize}]}
        numberOfLines={1}>
        {item?.title}
      </Text>
      <View style={[styles.bottomContainer, {marginTop: bottomMarginTop}]}>
        <Text style={[styles.priceText, {fontSize: priceFontSize}]}>
          ₹{item.price}
        </Text>
        <TouchableOpacity
          style={[
            styles.buttonIcon,
            {
              width: buttonSize,
              height: buttonSize,
              borderRadius: buttonSize * 0.15,
            },
          ]}>
          <Lucide name="minus" color={'#fff'} size={iconSize} />
        </TouchableOpacity>
      </View>
      {item?.count > 0 && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{item.count}</Text>
        </View>
      )}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
  },
  image: {
    width: '100%',
  },
  titleText: {
    fontSize: 12,
    fontFamily: fonts.inMedium,
    color: '#000',
    width: '100%',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  priceText: {
    fontSize: 14,
    fontFamily: fonts.inBold,
    color: '#000',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.error,
    borderRadius: 3,
  },
  countContainer: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 26 / 2,
    right: -5,
    top: -5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.sucess,
  },
  countText: {
    fontSize: 13,
    fontFamily: fonts.inBold,
    color: '#fff',
  },
});

export default BillProductCard;
