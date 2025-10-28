import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Ionicons from '@react-native-vector-icons/ionicons';
import SalesAreaChart from './SalesAreaChart';

const HomeChartComponent = memo(({selectedPriod, handleChangePriod}) => {
  return (
    <View style={styles.container}>
      <View style={styles.selectableContainer}>
        <TouchableOpacity
          onPress={() => {
            handleChangePriod('Today');
          }}
          style={[
            styles.selectable,
            selectedPriod === 'Today' && {
              backgroundColor: '#fff',
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: colors.primary,
            },
          ]}>
          <Text
            style={[
              styles.selectedText,
              selectedPriod === 'Today' && {color: colors.primary},
            ]}>
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleChangePriod('Week');
          }}
          style={[
            styles.selectable,
            selectedPriod === 'Week' && {
              backgroundColor: '#fff',
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: colors.primary,
            },
          ]}>
          <Text
            style={[
              styles.selectedText,
              selectedPriod === 'Week' && {color: colors.primary},
            ]}>
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleChangePriod('Month');
          }}
          style={[
            styles.selectable,
            selectedPriod === 'Month' && {
              backgroundColor: '#fff',
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: colors.primary,
            },
          ]}>
          <Text
            style={[
              styles.selectedText,
              selectedPriod === 'Month' && {color: colors.primary},
            ]}>
            Month
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.salesContainer}>
        <Text style={styles.salesText}>{selectedPriod}'s Sales</Text>
        <View style={styles.sales}>
          <Text style={styles.salesAmount}>₹ 5104.00</Text>
          <View style={styles.salesPercentage}>
            <Ionicons name="arrow-up" size={12} color={colors.sucess} />
            <Text style={styles.salesPercentageText}>1.3% increased</Text>
          </View>
        </View>
      </View>
      <View style={{paddingBottom: 50}}>
        <SalesAreaChart />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 20,
    marginHorizontal: 16,
  },
  selectableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: colors.primaryBackground,
    alignItems: 'center',
    padding: 8,
    borderRadius: 5,
  },
  selectable: {
    width: '30%',
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 12,
    fontFamily: fonts.inMedium,
    color: '#000000',
  },
  salesContainer: {
    marginTop: 15,
    gap: 10,
  },
  sales: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  salesPercentage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salesText: {
    fontSize: 14,
    fontFamily: fonts.inMedium,
    color: '#00000090',
  },
  salesAmount: {
    fontSize: 24,
    fontFamily: fonts.inBold,
    color: '#000',
  },
  salesPercentageText: {
    fontSize: 12,
    fontFamily: fonts.inMedium,
    color: colors.sucess,
  },
});

export default HomeChartComponent;
