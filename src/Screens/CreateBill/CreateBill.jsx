import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Layout} from '../Layout';
import {
  BillProductCard,
  CreateBillBottom,
  SecondaryHeader,
} from '../../Components';
import {products} from '../../utils/data';

const {width: screenWidth} = Dimensions.get('window');
const NUM_COLUMNS = 3;
const HORIZONTAL_PADDING = 16;
const GAP_BETWEEN_ITEMS = 10;

const ITEM_WIDTH =
  (screenWidth -
    HORIZONTAL_PADDING * 2 -
    GAP_BETWEEN_ITEMS * (NUM_COLUMNS - 1)) /
  NUM_COLUMNS;

const CreateBill = () => {
  return (
    <Layout>
      <SecondaryHeader title="Create Bill" />
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        data={products}
        keyExtractor={(_, index) => index + '_create_bill_item'}
        renderItem={({item}, index) => (
          <BillProductCard width={ITEM_WIDTH} item={item} />
        )}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
      <CreateBillBottom />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 10,
    paddingBottom: 20,
  },
  columnWrapperStyle: {
    gap: GAP_BETWEEN_ITEMS,
    marginBottom: 16,
  },
});

export default CreateBill;
