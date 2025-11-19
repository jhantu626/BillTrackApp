import {View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {colors} from '../../utils/colors';

const SalesAreaChart = () => {
  const barData = [
    {value: 250, label: 'M', frontColor: colors.primary},
    {value: 500, label: 'T', frontColor: colors.primary},
    {value: 745, label: 'W', frontColor: colors.primary},
    {value: 320, label: 'T', frontColor: colors.primary},
    {value: 600, label: 'F', frontColor: colors.primary},
    {value: 256, label: 'S', frontColor: colors.primary},
    {value: 300, label: 'S', frontColor: colors.primary},
  ];
  return (
    <View>
      <BarChart
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View>
  );
};

export default SalesAreaChart;
