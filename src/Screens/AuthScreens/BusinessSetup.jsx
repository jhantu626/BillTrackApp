import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCallback, useMemo, useRef, useState} from 'react';
import {AuthLayout} from '../Layout';
import {fonts} from '../../utils/fonts';
import {
  BottomSheetInput,
  DottedDivider,
  RadioInput,
  SearchInput,
  SimpleTextInput,
} from '../../Components';
import {
  validateEmail,
  validateIndianPhone,
  validateIndianPincode,
  validateName,
} from '../../utils/validator';
import {colors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import Ionicons from '@react-native-vector-icons/ionicons';
import {
  font,
  gap,
  height70,
  icon,
  margin,
  padding,
  widthResponsive,
} from '../../utils/responsive';

const businessTypes = [
  {id: 1, name: 'Retail'},
  {id: 2, name: 'Hospitality'},
  {id: 3, name: 'Technology'},
  {id: 4, name: 'Healthcare'},
  {id: 5, name: 'Education'},
  {id: 6, name: 'Finance'},
  {id: 7, name: 'Transportation'},
  {id: 8, name: 'Real Estate'},
  {id: 9, name: 'Entertainment'},
  {id: 10, name: 'Manufacturing'},
  {id: 11, name: 'Agriculture'},
  {id: 12, name: 'Construction'},
  {id: 13, name: 'Energy'},
  {id: 14, name: 'Telecommunications'},
  {id: 15, name: 'Legal Services'},
  {id: 16, name: 'Marketing & Advertising'},
  {id: 17, name: 'Nonprofit & Charity'},
  {id: 18, name: 'Food & Beverage'},
  {id: 19, name: 'Media & Publishing'},
  {id: 20, name: 'Logistics & Supply Chain'},
  {id: 21, name: 'Consulting'},
  {id: 22, name: 'Sports & Recreation'},
  {id: 23, name: 'Automotive'},
  {id: 24, name: 'Fashion & Apparel'},
  {id: 25, name: 'Travel & Tourism'},
  {id: 26, name: 'Security Services'},
  {id: 27, name: 'Environmental Services'},
  {id: 28, name: 'Government & Public Sector'},
  {id: 29, name: 'Insurance'},
  {id: 30, name: 'Human Resources & Staffing'},
];

const BusinessSetup = () => {
  const navigation = useNavigation();

  const bottomSheetRef = useRef(null);
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [query, setQuery] = useState('');

  // SUGGESTIONS
  const [suggestion, setSuggetion] = useState(
    bottomSheetType === 'businessType' ? businessTypes : [],
  );

  // TYPE STATES
  const [bottomSheetType, setBottomSheetType] = useState('businessType');

  // BOTTOM SHEET
  const snapPoints = useMemo(() => [height70], []);

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

  const handleOpenBottomSheet = type => {
    setBottomSheetType(type);
    bottomSheetRef.current?.expand();
  };
  const handleCloseBottomSheet = type => {
    setBottomSheetType(type);
    bottomSheetRef.current?.close();
  };

  const handleSearch = value => {
    setQuery(value);
    setSuggetion(() => {
      return bottomSheetType === 'businessType' ? businessTypes : [];
    });
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthLayout>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
          <Image
            style={styles.image}
            source={require('./../../../asset/images/business.png')}
            resizeMode="contain"
          />
          <Text style={styles.title}>Set Up Your Business</Text>
          <View style={styles.inputContainer}>
            <SimpleTextInput
              placeholder="Owner Name"
              maxLength={50}
              value={ownerName}
              setValue={setOwnerName}
              hasError={ownerName.length > 0 && !validateName(ownerName)}
            />
            <SimpleTextInput
              placeholder="Phone Number(+91)"
              maxLength={10}
              keyboardType="phone-pad"
              value={phone}
              setValue={setPhone}
              hasError={phone.length > 0 && !validateIndianPhone(phone)}
            />
            <SimpleTextInput
              placeholder="Email(Optional)"
              maxLength={100}
              keyboardType="email-address"
              value={email}
              setValue={setEmail}
              hasError={email.length > 0 && !validateEmail(email)}
            />
            <BottomSheetInput
              label="Business Type"
              onPress={() => handleOpenBottomSheet('businessType')}
            />
            <BottomSheetInput
              label="Choose State"
              onPress={() => handleOpenBottomSheet('stateType')}
            />
            <SimpleTextInput
              placeholder="Pincode"
              maxLength={6}
              keyboardType="numeric"
              value={pincode}
              setValue={setPincode}
              hasError={pincode.length > 0 && !validateIndianPincode(pincode)}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('BusinessSetup2');
            }}>
            <Text style={styles.buttonText}>CONTINUE</Text>
          </TouchableOpacity>
        </ScrollView>
      </AuthLayout>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableOverDrag={false}
        backdropComponent={renderBackdrop}
        handleComponent={() => null}
        animationConfigs={{
          duration: 300,
        }}
        backgroundStyle={{borderRadius: 0}}>
        {/* <BottomSheetView> */}
        <BottomSheetFlatList
          ListHeaderComponent={useCallback(
            () => (
              <View>
                <View style={styles.bottomSheetHeader}>
                  <Text style={styles.bottomSheetTitle}>
                    Choose Business Type
                  </Text>
                  <TouchableOpacity onPress={handleCloseBottomSheet}>
                    <Ionicons name="close" size={icon(24)} color={colors.primary} />
                  </TouchableOpacity>
                </View>
                <View style={styles.searchContainer}>
                  <Ionicons name="search" size={icon(24)} color={colors.border} />
                  <TextInput
                    placeholder="Search here..."
                    style={styles.searchInput}
                    value={query}
                    onChangeText={text => handleSearch(text)}
                  />
                </View>
              </View>
            ),
            [bottomSheetType],
          )}
          style={{flex: 1}}
          contentContainerStyle={styles.bottomSheetContainer}
          data={businessTypes}
          keyExtractor={(_, index) =>
            index + 'bottomsheet_radiobtn_' + bottomSheetType
          }
          renderItem={({item}) => (
            <View style={styles.bottomSheetItem}>
              <RadioInput
                value={item.id}
                label={item.name}
                setValue={setBusinessType}
                isSelected={businessType === item.id}
              />
            </View>
          )}
          ItemSeparatorComponent={() => <DottedDivider />}
          stickyHeaderHiddenOnScroll
          nestedScrollEnabled
        />
        {/* </BottomSheetView> */}
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: gap(10),
  },
  image: {
    width: icon(250),
    height: icon(120),
  },
  title: {
    fontSize: font(24),
    fontFamily: fonts.onBold,
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: padding(25),
    marginVertical: margin(15),
    gap: gap(15),
  },
  button: {
    width: widthResponsive(130),
    height: widthResponsive(45),
    borderRadius: 5,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: margin(10),
  },
  buttonText: {
    fontSize: font(16),
    fontFamily: fonts.onSemiBold,
    color: '#fff',
  },
  bottomSheetHeader: {
    height: icon(50),
    backgroundColor: colors.primary + 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: padding(15),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  bottomSheetTitle: {
    fontSize: 16,
    fontFamily: fonts.onSemiBold,
    color: colors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#F2F2F280',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.onRegular,
  },
  bottomSheetItem: {
    paddingHorizontal: 20,
  },
  bottomSheetContainer: {},
});

export default BusinessSetup;
