import {Image, StyleSheet, Switch, Text, View} from 'react-native';
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
import {API_URL} from '../../utils/config';

const ProductActiveCard = ({item, toggle}) => {
  console.log(JSON.stringify(item));
  return (
    <View style={styles.container}>
      <View style={styles.leftCOntainer}>
        <Image
          source={
            item.image
              ? {uri: `${API_URL}files/product/${item.image}`}
              : require('./../../../asset/images/emptyimg.jpg')
          }
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.leftRightContainer}>
          <Text style={styles.nameText}>{item?.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>₹{item?.price || 0}</Text>
            <Text style={styles.unitTypeText}>{item?.unitType}</Text>
          </View>
        </View>
      </View>
      <View>
        <View
          style={[
            {borderRadius: 15},
            item?.isActive
              ? {backgroundColor: colors.primary}
              : {backgroundColdor: '#D3D3D3'},
          ]}>
          <Switch
            trackColor={{false: 'transparent', true: 'transparent'}}
            thumbColor={'#fff'}
            ios_backgroundColor="#D3D3D3"
            value={item?.isActive}
            onValueChange={toggle}
          />
        </View>
      </View>
    </View>
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
    flex: 1,
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
    flex: 1,
  },
  nameText: {
    fontSize: font(14),
    fontFamily: fonts.inMedium,
    color: '#00000090',
    flexWrap: 'wrap',
  },
  subNameText: {
    fontSize: font(12),
    fontFamily: fonts.inMedium,
    color: '#00000080',
  },
  priceText: {
    fontSize: font(14),
    fontFamily: fonts.inSemiBold,
    color: '#000',
    textAlign: 'right',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gap(10),
  },
  unitTypeText: {
    fontSize: font(10),
    fontFamily: fonts.inBold,
    color: colors.sucess,
    backgroundColor: colors.sucess + 40,
    paddingHorizontal: padding(10),
    paddingVertical: padding(2),
    borderRadius: 5,
  },
});

export default ProductActiveCard;
