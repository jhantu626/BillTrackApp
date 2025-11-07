import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useMemo} from 'react';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Ionicons from '@react-native-vector-icons/ionicons';
import SalesAreaChart from './SalesAreaChart';
import {
  font,
  gap,
  heightResponsive,
  margin,
  padding,
} from '../../utils/responsive';

const {width} = Dimensions.get('screen');

const HomeChartComponent = memo(
  ({
    selectedPriod,
    handleChangePriod,
    salesDurations = ['Today', 'Week', 'Month'],
  }) => {

    return (
      <View style={styles.container}>
        <View style={styles.selectableContainer}>
          {salesDurations.map(period => (
            <TouchableOpacity
              key={period}
              onPress={() => handleChangePriod(period)}
              style={[
                styles.selectable,
                selectedPriod === period && {
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  borderWidth: 0.5,
                  borderColor: colors.primary,
                },
              ]}>
              <Text
                style={[
                  styles.selectedText,
                  selectedPriod === period && {color: colors.primary},
                ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.salesContainer}>
          <Text style={[styles.salesText]}>{selectedPriod}'s Sales</Text>
          <View style={styles.sales}>
            <Text style={[styles.salesAmount]}>₹ 5104.00</Text>
            <View style={styles.salesPercentage}>
              <Ionicons name="arrow-up" size={12} color={colors.sucess} />
              <Text style={[styles.salesPercentageText]}>1.3% increased</Text>
            </View>
          </View>
        </View>
        <View style={{paddingBottom: padding(5)}}>
          <SalesAreaChart />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    padding: padding(12),
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: margin(20),
    marginHorizontal: margin(16),
  },
  selectableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 48,
    backgroundColor: colors.primaryBackground,
    alignItems: 'center',
    padding: padding(8),
    borderRadius: 5,
  },
  selectable: {
    width: '30%',
    // height: heightResponsive(30),
    paddingVertical: padding(6),
    paddingHorizontal: padding(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: font(10),
    fontFamily: fonts.inMedium,
    color: '#000000',
  },
  salesContainer: {
    marginTop: margin(15),
    gap: gap(10),
  },
  sales: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gap(10),
  },
  salesPercentage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salesText: {
    fontSize: font(14),
    fontFamily: fonts.inMedium,
    color: '#00000090',
  },
  salesAmount: {
    fontSize: font(24),
    fontFamily: fonts.inBold,
    color: '#000',
  },
  salesPercentageText: {
    fontSize: font(12),
    fontFamily: fonts.inMedium,
    color: colors.sucess,
  },
});

export default HomeChartComponent;
