import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {
  font,
  gap,
  margin,
  padding,
  widthResponsive,
} from '../../utils/responsive';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';

const ProductCardRow = ({onpressCard = () => {}}) => {
  return (
    <Pressable style={styles.container} onPress={onpressCard}>
      <View style={styles.leftCOntainer}>
        <Image
          source={require('./../../../asset/images/emptyimg.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.leftRightContainer}>
          <Text style={styles.nameText}>Tandoori Kebab</Text>
          <Text style={styles.subNameText}>Per Piece</Text>
        </View>
      </View>
      <View>
        <Text style={styles.priceText}>₹ NA</Text>
        <Text style={[styles.subNameText, {color: colors.error}]}>
          Per plate
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: padding(10),
    paddingHorizontal: padding(9),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: margin(5),
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  leftCOntainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gap(16),
  },
  image: {
    width: widthResponsive(55),
    aspectRatio: 11 / 8,
  },
  leftRightContainer: {
    gap: gap(6),
  },
  nameText: {
    fontSize: font(14),
    fontFamily: fonts.inBold,
    color: '#000',
  },
  subNameText: {
    fontSize: font(12),
    fontFamily: fonts.inMedium,
    color: '#00000080',
  },
  priceText: {
    fontSize: font(16),
    fontFamily: fonts.inSemiBold,
    color: '#000',
    textAlign: 'right',
  },
});

export default ProductCardRow;
