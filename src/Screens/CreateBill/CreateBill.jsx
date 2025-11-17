import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Layout} from '../Layout';
import {
  BillProductCard,
  CreateBillBottom,
  SecondaryHeader,
  SimpleTextInput,
} from '../../Components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Ionicons from '@react-native-vector-icons/ionicons';
import {fonts} from '../../utils/fonts';
import {validateIndianPhone} from '../../utils/validator';
import {colors} from '../../utils/colors';
import {
  font,
  gap,
  isTabletDevice,
  margin,
  padding,
} from '../../utils/responsive';
import {useProduct} from '../../Contexts/ProductContexts';

const {width: screenWidth} = Dimensions.get('window');
const NUM_COLUMNS = isTabletDevice ? 4 : 3;
const HORIZONTAL_PADDING = 16;
const GAP_BETWEEN_ITEMS = 10;

const ITEM_WIDTH =
  (screenWidth -
    HORIZONTAL_PADDING * 2 -
    GAP_BETWEEN_ITEMS * (NUM_COLUMNS - 1)) /
  NUM_COLUMNS;

const CreateBill = () => {
  const {Products} = useProduct();
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // STATE VARIABLES
  const [phoneNumber, setPhoneNumber] = useState('');

  // BOTTOMSHEET
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['30%'], []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  });

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

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Layout>
        <SecondaryHeader title="Create Bill" />
        <FlatList
          style={{flex: 1}}
          contentContainerStyle={styles.container}
          data={Products}
          keyExtractor={(_, index) => index + '_create_bill_item'}
          renderItem={({item}, index) => (
            <BillProductCard
              width={ITEM_WIDTH}
              item={item}
              setQuantity={setQuantity}
              setTotalPrice={setTotalPrice}
            />
          )}
          numColumns={NUM_COLUMNS}
          columnWrapperStyle={styles.columnWrapperStyle}
        />
        <CreateBillBottom
          totalQuanity={quantity}
          totalAmount={totalPrice}
          saveButtonFunciton={handleOpenBottomSheet}
        />
      </Layout>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        handleComponent={() => null}
        backgroundStyle={{borderRadius: 0}}
        backdropComponent={renderBackdrop}
        animationConfigs={{
          duration: 250,
        }}
        enableHandlePanningGesture={false}>
        <BottomSheetView style={{flex: 1, padding: padding(15)}}>
          <View style={styles.bottomSheetContaienr}>
            <Text style={styles.bottomSheetTitleText}>
              Enter customer phone number
            </Text>
            <TouchableOpacity onPress={handleCloseBottomSheet}>
              <Ionicons name="close" size={20} color={'#000'} />
            </TouchableOpacity>
          </View>
          <Text style={styles.bottomSheetSubTitleText}>
            For sending sms & reminders
          </Text>
          <View style={styles.bottomSheetPhoneContainer}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: fonts.popMedium,
                color: '#000',
              }}>
              Phone number
            </Text>
            <SimpleTextInput
              maxLength={10}
              hasError={
                phoneNumber.length > 0 && !validateIndianPhone(phoneNumber)
              }
              value={phoneNumber}
              setValue={setPhoneNumber}
              keyboardType="phone-pad"
              placeholder="Customer Phone Number"
              borderColor="#00000090"
              placeholderTextColor="#00000095"
            />
          </View>
          <View style={styles.bottomSheetButtonContaienr}>
            <TouchableOpacity
              style={[
                styles.bottomSheetButton,
                {
                  backgroundColor: colors.sucess,
                },
              ]}>
              <Text style={styles.bottomSheetButtonText}>SEND</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.bottomSheetButton,
                {backgroundColor: colors.error},
              ]}>
              <Text style={styles.bottomSheetButtonText}>PRINT</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding(16),
    marginTop: margin(10),
    paddingBottom: padding(20),
  },
  columnWrapperStyle: {
    gap: GAP_BETWEEN_ITEMS,
    marginBottom: margin(16),
  },
  bottomSheetContaienr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomSheetTitleText: {
    fontSize: font(16),
    fontFamily: fonts.popMedium,
    color: '#000',
  },
  bottomSheetSubTitleText: {
    fontSize: font(11),
    fontFamily: fonts.popRegular,
    color: '#00000080',
  },
  bottomSheetPhoneContainer: {
    gap: gap(8),
    marginVertical: margin(20),
  },
  bottomSheetButtonContaienr: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: gap(15),
    marginBottom: margin(20),
  },
  bottomSheetButton: {
    paddingVertical: padding(6),
    paddingHorizontal: padding(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  bottomSheetButtonText: {
    fontSize: font(14),
    fontFamily: fonts.popSemiBold,
    color: '#fff',
  },
});

export default CreateBill;
