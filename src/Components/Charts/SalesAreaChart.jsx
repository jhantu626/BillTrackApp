import React, {useMemo, useState, useCallback, memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {colors} from '../../utils/colors';
import {
  font,
  margin,
  padding,
  widthResponsive,
  heightResponsive,
} from '../../utils/responsive';

const formatINR = n => '₹' + Math.round(n).toLocaleString('en-IN');

const formatK = n => {
  if (n >= 10000000) return (n / 10000000).toFixed(1).replace('.0', '') + 'Cr';
  if (n >= 100000) return (n / 100000).toFixed(1).replace('.0', '') + 'L';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'k';
  return String(n);
};

const SalesAreaChart = memo(
  ({
    data: inputData,
    chartColor = colors.primary,
    height = heightResponsive(200),
  }) => {
    const data = useMemo(() => {
      return inputData?.length
        ? inputData
        : [
            {value: 2200, label: '04:00'},
            {value: 3400, label: '05:30'},
            {value: 2800, label: '06:30'},
            {value: 4600, label: '07:30'},
            {value: 3900, label: '08:30'},
            {value: 5200, label: '09:30'},
            {value: 4100, label: '10:30'},
            {value: 6100, label: '11:30'},
            {value: 3000, label: '12:30'},
            {value: 4800, label: '13:30'},
            {value: 4500, label: '14:30'},
            {value: 5300, label: '15:30'},
            {value: 3800, label: '16:30'},
            {value: 5600, label: '17:30'},
            {value: 3200, label: '18:30'},
            {value: 6400, label: '19:30'},
          ];
    }, [inputData]);

    const [chartWidth, setChartWidth] = useState(0);
    const onLayout = useCallback(e => {
      setChartWidth(e.nativeEvent.layout.width || 0);
    }, []);

    const yAxisLabelWidth = widthResponsive(42);
    const spacing = useMemo(() => {
      if (!chartWidth || data.length <= 1) return widthResponsive(28);
      const available = Math.max(
        chartWidth - yAxisLabelWidth - widthResponsive(24),
        widthResponsive(100),
      );
      const s = available / (data.length - 1);
      return Math.max(widthResponsive(16), Math.min(widthResponsive(40), s));
    }, [chartWidth, data.length]);

    const gridColor = 'rgba(255,255,255,0.20)'; // lighter grid per screenshot

    return (
      <View style={[styles.container, {height}]} onLayout={onLayout}>
        <LineChart
          data={data}
          areaChart
          curved
          isAnimated
          color={chartColor}
          thickness={widthResponsive(2.5)}
          startFillColor={chartColor}
          endFillColor="#fff"
          startOpacity={0.85}
          endOpacity={0.12}
          gradientDirection="vertical"
          hideDataPoints
          yAxisTextStyle={styles.yAxisText}
          yAxisColor="transparent"
          xAxisColor="transparent"
          rulesColor={gridColor}
          rulesType="solid"
          noOfSections={5}
          yAxisLabelWidth={yAxisLabelWidth}
          yAxisTextNumberOfLines={1}
          xAxisLabelTextStyle={styles.xAxisText}
          xAxisTextNumberOfLines={1}
          formatYLabel={formatK}
          initialSpacing={widthResponsive(12)}
          spacing={spacing}
          xAxisIndicesHeight={0}
          showStripOnPress
          showPointerOnPress
          pressEnabled
          pointerConfig={{
            activatePointersOnLongPress: true,
            panGestureEnabled: true,
            pointerStripHeight: height - heightResponsive(40),
            pointerStripColor: 'rgba(0,0,0,0.25)',
            pointerStripWidth: widthResponsive(2),
            pointerColor: '#FFFFFF',
            radius: widthResponsive(7),
            pointerVanishDelay: 50,
            autoAdjustPointerLabelPosition: true,
            pointerComponent: () => (
              <View
                style={{
                  width: widthResponsive(16),
                  height: widthResponsive(16),
                  borderRadius: widthResponsive(8),
                  backgroundColor: '#fff',
                  borderWidth: widthResponsive(3),
                  borderColor: chartColor,
                }}
              />
            ),
            pointerLabelComponent: items => {
              const item = items && items[0];
              if (!item) return null;
              const sales = Math.max(300, Math.round(item.value / 4));

              return (
                <View style={styles.tooltipWrapper}>
                  <View style={styles.tooltipBubble}>
                    <Text style={styles.tooltipLine1}>
                      {sales.toLocaleString('en-IN')} sales
                    </Text>
                    <Text style={[styles.tooltipLine2, {color: chartColor}]}>
                      {formatINR(item.value)}
                    </Text>
                  </View>
                  <View style={styles.tooltipCaret} />
                </View>
              );
            },
          }}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingTop: padding(4),
    // paddingBottom: padding(8),
    backgroundColor: '#fff',
    borderRadius: widthResponsive(10),
    overflow: 'hidden',
  },
  yAxisText: {
    color: '#000',
    fontSize: font(11),
    fontWeight: '500',
  },
  xAxisText: {
    color: '#fff',
    fontSize: font(10),
    marginTop: margin(8),
    fontWeight: '500',
  },
  tooltipWrapper: {
    alignItems: 'center',
    transform: [{translateY: -10}],
  },
  tooltipBubble: {
    backgroundColor: '#ffffff',
    // paddingVertical: padding(8),
    paddingHorizontal: padding(10),
    borderRadius: widthResponsive(10),
    minWidth: widthResponsive(100),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: widthResponsive(6),
    elevation: 4,
  },
  tooltipLine1: {
    color: '#fff',
    fontSize: font(12),
    fontWeight: '600',
  },
  tooltipLine2: {
    marginTop: margin(2),
    fontSize: font(14),
    fontWeight: '700',
  },
  tooltipCaret: {
    width: 0,
    height: 0,
    borderLeftWidth: widthResponsive(7),
    borderRightWidth: widthResponsive(7),
    borderTopWidth: widthResponsive(7),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ffffff',
  },
});

export default SalesAreaChart;
