import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {Layout} from '../Layout';
import {
  HomeChartComponent,
  InvoiceCard,
  Loader,
  PrimaryHeader,
  SalesAreaChart,
} from '../../Components';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {invoice} from '../../utils/data';
import {
  font,
  gap,
  heightResponsive,
  margin,
  padding,
} from '../../utils/responsive';

const Home = () => {
  const navigation = useNavigation();
  // STATE VARIABLES
  const [selectedPriod, setSelectedPriod] = React.useState('Today');
  const handleChangePriod = useCallback(priod => {
    setSelectedPriod(priod);
  }, []);
  return (
    <Layout>
      <PrimaryHeader />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          paddingBottom: padding(30),
        }}>
        <HomeChartComponent
          selectedPriod={selectedPriod}
          handleChangePriod={handleChangePriod}
        />
        <View style={styles.invoiceContainer}>
          <View style={styles.invoiceHeader}>
            <Text style={fonts.headerText}>All Invoice List</Text>
            <TouchableOpacity
              style={styles.headerRight}
              onPress={() => {
                navigation.navigate('Invoice');
              }}>
              <Text style={styles.headerRightText}>See more</Text>
              <Ionicons name="arrow-forward" size={12} color={colors.primary} />
            </TouchableOpacity>
          </View>
          {invoice.map((item, index) => (
            <InvoiceCard invoice={item} key={index + 'invoice_card'} />
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  invoiceContainer: {
    marginHorizontal: margin(16),
    gap: gap(15),
  },
  invoiceHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: padding(16),
    height: heightResponsive(50),
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: font(12),
    fontFamily: fonts.inMedium,
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: gap(5),
  },
  headerRightText: {
    fontSize: font(12),
    fontFamily: fonts.inMedium,
    color: colors.primary,
  },
});

export default Home;
