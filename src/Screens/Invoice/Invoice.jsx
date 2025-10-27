import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Layout} from '../Layout';
import {InvoiceCard, SecondaryHeader} from '../../Components';
import Lucide from '@react-native-vector-icons/lucide';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {invoice} from '../../utils/data';

const Invoice = () => {
  return (
    <Layout>
      <SecondaryHeader title="Invoice list" />
      <FlatList
        contentContainerStyle={styles.container}
        ListHeaderComponent={() => (
          <View style={styles.topHeader}>
            <Text style={styles.titleText}>All Invoice List</Text>
            <TouchableOpacity style={styles.sortButton}>
              <Text style={styles.sortText}>Sort</Text>
              <Lucide name="arrow-down-up" size={12} color={colors.primary} />
            </TouchableOpacity>
          </View>
        )}
        data={invoice}
        keyExtractor={(_, index) => index + '_invoice_items'}
        renderItem={({item}, index) => <InvoiceCard invoice={item} />}
        stickyHeaderIndices={[0]}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 16,
    marginTop: 17,
    marginBottom: 5,
  },
  titleText: {
    fontSize: 14,
    fontFamily: fonts.inMedium,
    color: '#000',
  },
  sortButton: {
    width: 77,
    height: 27,
    backgroundColor: colors.primary + 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  sortText: {
    fontSize: 12,
    fontFamily: fonts.onSemiBold,
    color: colors.primary,
  },
  container: {
    paddingHorizontal: 16,
    gap: 15,
    paddingBottom: 50,
  },
});

export default Invoice;
