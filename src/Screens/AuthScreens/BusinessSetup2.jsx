import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AuthLayout} from '../Layout';
import {SimpleTextInput} from '../../Components';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  validateAddress,
  validateBusinessName,
  validateIndianGST,
} from '../../utils/validator';
import {
  font,
  gap,
  icon,
  margin,
  padding,
  widthResponsive,
} from '../../utils/responsive';

const BusinessSetup2 = () => {
  const [image, setImage] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [address, setAddress] = useState('');

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      const granted = await PermissionsAndroid.request(permission);

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  };

  const handleImagePickcker = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      ToastAndroid.show('Permission denied', ToastAndroid.SHORT);
      return;
    }
    ImageCropPicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      avoidEmptySpaceAroundImage: true,
    }).then(image => {
      setImage(image);
    });
  };

  return (
    <AuthLayout>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <Image
          style={styles.image}
          source={require('./../../../asset/images/business.png')}
          resizeMode="contain"
        />
        <Text style={styles.title}>Set Up Your Business</Text>
        <View style={styles.logoContainer}>
          <Image
            source={
              image
                ? {
                    uri: image?.path,
                  }
                : require('./../../../asset/images/businessLogo.png')
            }
            style={styles.logo}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleImagePickcker}>
            <MaterialIcons
              name="file-upload"
              size={16}
              color={colors.primary}
            />
            <Text style={styles.uploadText}>Upload Logo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <SimpleTextInput
            placeholder="Business Name"
            maxLength={50}
            value={businessName}
            setValue={setBusinessName}
            hasError={
              businessName.length > 0 && !validateBusinessName(businessName)
            }
          />
          <SimpleTextInput
            placeholder="GST Number"
            maxLength={15}
            value={gstNumber}
            setValue={setGstNumber}
            hasError={gstNumber.length > 0 && !validateIndianGST(gstNumber)}
            upperCase={true}
          />
          <SimpleTextInput
            placeholder="Business Address"
            maxLength={100}
            value={address}
            setValue={setAddress}
            hasError={address.length > 0 && !validateAddress(address)}
          />
          {/* <TextInput keyboardType="email-address" /> */}
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>PROCEED</Text>
        </TouchableOpacity>
      </ScrollView>
    </AuthLayout>
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
    width: icon(130),
    height: icon(45),
    borderRadius: 5,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: margin(10),
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: gap(10),
    marginVertical: margin(5),
  },
  logo: {
    width: icon(100),
    height: icon(100),
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: icon(100) / 2,
  },
  buttonText: {
    fontSize: font(16),
    fontFamily: fonts.onSemiBold,
    color: '#fff',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary + 30,
    width: icon(130),
    height: icon(40),
    gap: gap(5),
  },
  uploadText: {
    fontSize: font(14),
    fontFamily: fonts.onMedium,
    color: colors.primary,
  },
});

export default BusinessSetup2;