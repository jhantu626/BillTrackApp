import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Layout} from '../Layout';
import {
  DottedDivider,
  InvoiceCard,
  RadioInput,
  SecondaryHeader,
} from '../../Components';
import Lucide from '@react-native-vector-icons/lucide';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {invoice} from '../../utils/data';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Ionicons from '@react-native-vector-icons/ionicons';

const Invoice = () => {
  const bottomSheetRef = useRef(null);
  const snapPonts = useMemo(() => ['50%'], []);

  // STATE VARIABLES
  const [sortBy, setSortBy] = useState('');

  const renderBackdrop = useMemo(
    () => props =>
      (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.8}
        />
      ),
    [],
  );

  const handleOpenBottomSheet = useCallback(
    () => bottomSheetRef.current?.snapToIndex(1),
    [],
  );
  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    console.info('close');
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Layout>
        <SecondaryHeader title="Invoice list" />
        <FlatList
          contentContainerStyle={styles.container}
          ListHeaderComponent={() => (
            <View style={styles.topHeader}>
              <Text style={styles.titleText}>All Invoice List</Text>
              <TouchableOpacity
                style={styles.sortButton}
                onPress={handleOpenBottomSheet}>
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
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPonts}
        index={-1}
        backdropComponent={renderBackdrop}
        handleComponent={() => null}
        animationConfigs={{
          duration: 300,
        }}
        backgroundStyle={{borderRadius: 0}}
        enableOverDrag={false}>
        <BottomSheetView style={{flex: 1, gap: 10}}>
          <View style={styles.bottomSheetTop}>
            <Text style={styles.bottomSheetTopText}>Sorting</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseBottomSheet}>
              <Ionicons name="close" size={26} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.bottomSheetBottom}>
              <RadioInput
                label={'Amount high to low'}
                value={'amount_high_to_low'}
                setValue={setSortBy}
                isSelected={sortBy === 'amount_high_to_low'}
                height={45}
              />
            </View>
            <DottedDivider />
            <View style={styles.bottomSheetBottom}>
              <RadioInput
                label={'Amount low to high'}
                value={'amount_low_to_high'}
                setValue={setSortBy}
                isSelected={sortBy === 'amount_low_to_high'}
                height={45}
              />
            </View>
            <DottedDivider />
            <View style={styles.bottomSheetBottom}>
              <RadioInput
                label={'Amount paid'}
                value={'amount_paid'}
                setValue={setSortBy}
                isSelected={sortBy === 'amount_paid'}
                height={45}
              />
            </View>
            <DottedDivider />
            <View style={styles.bottomSheetBottom}>
              <RadioInput
                label={'Amount unpaid'}
                value={'amount_unpaid'}
                setValue={setSortBy}
                isSelected={sortBy === 'amount_unpaid'}
                height={45}
              />
            </View>
            <DottedDivider />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
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
  bottomSheetTop: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.primary + 30,
  },
  bottomSheetTopText: {
    fontSize: 14,
    fontFamily: fonts.inSemiBold,
    color: colors.primary,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetBottom: {
    paddingHorizontal: 16,
  },
});

export default Invoice;
