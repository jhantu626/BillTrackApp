import {View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {colors} from '../../utils/colors';
import {font} from '../../utils/responsive';

const SalesAreaChart = ({
  barData = [
    {value: 250, label: 'Mon'},
    {value: 500, label: 'Tue'},
    {value: 745, label: 'Wed'},
    {value: 320, label: 'Thu'},
    {value: 600, label: 'Fri'},
    {value: 256, label: 'Sat'},
    {value: 300, label: 'Sun'},
  ],
}) => {
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
      />
    </View>
  );
};

export default SalesAreaChart;
