import {View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {colors} from '../../utils/colors';
import {font} from '../../utils/responsive';

const SalesAreaChart = ({barData = []}) => {
  console.log('barData', JSON.stringify(barData));

  const maxValue = Math.max(...barData.map(item => item.value));
  const chartMaxValue = Math.ceil(maxValue * 1.2);

  return (
    <View>
      <BarChart
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor={colors.primary}
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{
          fontSize: font(10),
        }}
        yAxisTextStyle={{
          fontSize: font(10),
        }}
        maxValue={chartMaxValue}
        showValuesAsTopLabel={true}
        topLabelTextStyle={{
          fontSize: font(7),
        }}
      />
    </View>
  );
};

export default SalesAreaChart;
