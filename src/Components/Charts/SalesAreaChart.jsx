import {View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {colors} from '../../utils/colors';
import {font} from '../../utils/responsive';

const SalesAreaChart = ({barData = []}) => {
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
