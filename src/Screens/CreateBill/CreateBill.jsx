import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Layout} from '../Layout';
import {
  BillProductCard,
  CommonModal,
  CreateBillBottom,
  EmptyProductComponent,
  RadioInput,
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
import ToastService from '../../Components/Toasts/ToastService';
import {invoiceService} from '../../Services/InvoiceService';
import {
  useAuthToken,
  useBusiness,
  useSubscription,
} from '../../Contexts/AuthContext';
import {
  useAppSettings,
  useAppSettingsValue,
} from '../../Contexts/AppSettingContexts';
import {usePrinter} from '../../Contexts/PrinterContext';
import {calculateInvoiceData} from '../../utils/helper';
import printerService from '../../utils/PrinterService';
import {sendToWhatsApp} from '../../utils/WhatsappShare';

const {width: screenWidth} = Dimensions.get('window');
const NUM_COLUMNS = isTabletDevice ? 4 : 3;
const HORIZONTAL_PADDING = 16;
const GAP_BETWEEN_ITEMS = 10;

const ITEM_WIDTH =
  (screenWidth -
    HORIZONTAL_PADDING * 2 -
    GAP_BETWEEN_ITEMS * (NUM_COLUMNS - 1)) /
  NUM_COLUMNS;

const PAYMENT_OPTIONS = ['cash', 'card', 'upi'];

const CreateBill = () => {
  const {printer} = usePrinter();
  const business = useBusiness();
  const {getByKey} = useAppSettings();
  const token = useAuthToken();
  const {Products, resetProductCount} = useProduct();
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sentWhatAppEnabled = useAppSettingsValue(
    'SEND_WHATSAPP_BILL_ON_CREATE_BILL',
  );
  const isPremiumPlanAndActive = useSubscription('isPremiumPlanAndActive');

  const product = Products;

  // STATE VARIABLES
  const [phoneNumber, setPhoneNumber] = useState('');

  // LOADING STATE
  const [isPrintLoading, setIsPrintLoading] = useState(false);
  const [isSendLoading, setIsSendLoading] = useState(false);

  // BOTTOMSHEET
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['30%'], []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    Keyboard.dismiss();
  }, []);
  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
    Keyboard.dismiss();
  });

  const renderBackdrop = useMemo(
    () => props =>
      (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.8}
          pressBehavior={'none'}
          onPress={() => {
            Keyboard.dismiss();
          }}
        />
      ),
    [],
  );

  const handleSave = () => {
    if (!quantity) {
      ToastService.show({
        message: 'Please Add Products',
        type: 'error',
        position: 'top',
      });
      return;
    }
    handleOpenBottomSheet();
  };

  const printData = async () => {
    if (phoneNumber && !validateIndianPhone(phoneNumber)) {
      ToastService.show({
        message: 'Please enter a valid phone number',
        type: 'error',
        position: 'top',
      });
      return;
    }
    try {
      setIsPrintLoading(true);
      const selectedItems = product
        .filter(item => item.count)
        .map(item => {
          const hasHSN =
            item?.hsn &&
            typeof item.hsn === 'object' &&
            Object.keys(item.hsn).length > 0;

          return {
            productName: item?.name,
            quantity: item?.count,
            rate: Number(item?.price).toFixed(2),
            gstType: hasHSN ? 'cgst/sgst' : null,
            gstPercentage: hasHSN
              ? (
                  Number(item.hsn?.cGst || 0) + Number(item.hsn?.sGst || 0)
                ).toFixed(2)
              : null,
          };
        });
      const payload = {
        token,
        items: selectedItems,
        paymentMode: paymentMethod,
        customerNumber: phoneNumber,
      };
      const data = await invoiceService.createInvoice(payload);
      if (data?.status) {
        ToastService.show({
          message: 'Bill Created Successfully',
          type: 'success',
          position: 'top',
        });
        setPhoneNumber('');
        setQuantity(0);
        setTotalPrice(0);
        resetProductCount();
        handleCloseBottomSheet();
        const printOnCreateBill = getByKey('PRINT_ON_CREATE_BILL');
        if (printOnCreateBill && isPremiumPlanAndActive) {
          console.log(JSON.stringify(data?.invoice));
          const invoice = data?.invoice;
          const invoiceItems = await invoiceService.getInvoiceItems(
            invoice?.id,
          );
          const {gstListCalculate, items, subTotalAmount, totalQuantity} =
            calculateInvoiceData(invoiceItems?.items);
          await printerService.printInvoice(
            printer,
            invoice,
            items,
            gstListCalculate,
            totalQuantity,
            subTotalAmount,
            business,
          );
        }
      }
    } catch (error) {
    } finally {
      setIsPrintLoading(false);
    }
  };

  const sentData = async () => {
    if (!phoneNumber || !validateIndianPhone(phoneNumber)) {
      ToastService.show({
        message: 'Enter a valid phone number',
        type: 'error',
        position: 'top',
      });
      return;
    }
    try {
      setIsSendLoading(true);
      const selectedItems = product
        .filter(item => item.count)
        .map(item => {
          const hasHSN =
            item?.hsn &&
            typeof item.hsn === 'object' &&
            Object.keys(item.hsn).length > 0;

          return {
            productName: item?.name,
            quantity: item?.count,
            rate: Number(item?.price).toFixed(2),
            gstType: hasHSN ? 'cgst/sgst' : null,
            gstPercentage: hasHSN
              ? (
                  Number(item.hsn?.cGst || 0) + Number(item.hsn?.sGst || 0)
                ).toFixed(2)
              : null,
          };
        });
      const data = await invoiceService.createInvoice({
        token,
        customerNumber: phoneNumber,
        items: selectedItems,
        paymentMode: paymentMethod,
      });
      if (data?.status) {
        ToastService.show({
          message: 'Bill Created Successfully',
          type: 'success',
          position: 'top',
        });
        setPhoneNumber('');
        setQuantity(0);
        setTotalPrice(0);
        resetProductCount();
        handleCloseBottomSheet();
        if (sentWhatAppEnabled) {
          await sendToWhatsApp({
            businessName: business?.name,
            invoiceNumber: data?.invoice?.invoiceNumber,
            createdAt: data?.invoice?.createdAt,
            customerNumber: data?.invoice?.customerNumber,
            totalAmount: data?.invoice?.totalAmount,
            paymentMode: data?.invoice?.paymentMode,
          });
          console.log(JSON.stringify(data));
        }
      }
    } catch (error) {
    } finally {
      setIsSendLoading(false);
    }
  };

  const openPaymentModal = () => {
    setPaymentModalVisible(true);
  };
  const closePaymentModal = () => {
    setPaymentModalVisible(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    closePaymentModal();
  }, [paymentMethod]);

  const filteredProduct = useMemo(() => {
    if (!searchQuery.trim()) {
      return product;
    }

    return product.filter(productItem =>
      productItem.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, Products]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Layout>
          <SecondaryHeader
            title="Create Bill"
            query={searchQuery}
            onchangeText={text => setSearchQuery(text)}
          />
          <FlatList
            keyboardShouldPersistTaps="handled"
            style={{flex: 1}}
            contentContainerStyle={styles.container}
            data={filteredProduct.filter(p => p.price)}
            keyExtractor={(_, index) => index + '_create_bill_item'}
            renderItem={({item}, index) => (
              <BillProductCard
                width={ITEM_WIDTH}
                item={item}
                setQuantity={setQuantity}
                setTotalPrice={setTotalPrice}
                key={index + '_bill_card'}
              />
            )}
            numColumns={NUM_COLUMNS}
            columnWrapperStyle={styles.columnWrapperStyle}
            ListEmptyComponent={() => <EmptyProductComponent />}
          />
          <CreateBillBottom
            totalQuanity={quantity}
            totalAmount={totalPrice}
            saveButtonFunciton={handleSave}
            cashButtonFunction={openPaymentModal}
            paymentMode={paymentMethod}
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
                Phone number(Optional)
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
                ]}
                onPress={sentData}
                disabled={isSendLoading}>
                {isSendLoading ? (
                  <ActivityIndicator size={'small'} color={'#fff'} />
                ) : (
                  <Text style={styles.bottomSheetButtonText}>SEND</Text>
                )}{' '}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.bottomSheetButton,
                  {backgroundColor: colors.error},
                ]}
                onPress={printData}
                disabled={isPrintLoading}>
                {isPrintLoading ? (
                  <ActivityIndicator size={'small'} color={'#fff'} />
                ) : (
                  <Text style={styles.bottomSheetButtonText}>PRINT</Text>
                )}
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
        <CommonModal
          visible={isPaymentModalVisible}
          handleClose={closePaymentModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Payment Mode</Text>
            <View style={styles.modalRadioContainer}>
              {PAYMENT_OPTIONS.map((item, index) => (
                <RadioInput
                  label={item.toUpperCase()}
                  setValue={setPaymentMethod}
                  value={item}
                  isSelected={paymentMethod === item}
                  key={index}
                />
              ))}
            </View>
          </View>
        </CommonModal>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
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
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: padding(16),
  },
  modalTitle: {
    fontSize: font(16),
    fontFamily: fonts.popSemiBold,
    color: '#000',
  },
  modalRadioContainer: {
    marginTop: margin(20),
    gap: gap(10),
  },
});

export default CreateBill;
