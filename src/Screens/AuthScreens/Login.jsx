import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AuthLayout} from '../Layout';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import {useNavigation} from '@react-navigation/native';
import {
  font,
  gap,
  icon,
  margin,
  padding,
  widthResponsive,
} from '../../utils/responsive';
import {validateIndianPhone} from '../../utils/validator';
import {authService} from '../../Services/AuthService';

const Login = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendOtp = async () => {
    if (!validateIndianPhone(mobile)) {
      setError('Please enter a valid mobile number');
      return;
    }
    setError('');
    try {
      setIsLoading(true);
      const data = await authService.login(mobile);
      if (data?.status) {
        navigation.navigate('Otp', {
          mobile,
        });
      } else {
        ToastAndroid.show(data?.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            paddingVertical: margin(20),
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Image
            source={require('./../../../asset/images/login.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Log in to manage your bills</Text>
            <Text numberOfLines={3} style={styles.description}>
              Access your billing dashboard to generate invoices, track
              payments, and manage expenses with ease.
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.phoneText}>Phone number*</Text>
            <View style={styles.phoneBox}>
              <FontAwesome
                name="phone"
                size={icon(20)}
                color={colors.primary}
              />
              <View style={styles.inputBar} />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="9775746484"
                  maxLength={10}
                  value={mobile}
                  onChangeText={text => setMobile(text)}
                  keyboardType="phone-pad"
                />
                <FontAwesome
                  name="check-circle"
                  size={icon(20)}
                  color={colors.primary}
                />
              </View>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity style={styles.button} onPress={sendOtp}>
              {isLoading ? (
                <ActivityIndicator size="small" color={'#fff'} />
              ) : (
                <Text style={styles.buttonText}>GET OTP</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  image: {
    width: icon(250),
    height: icon(250),
  },
  contentContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: font(24),
    fontFamily: fonts.onBold,
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontSize: font(16),
    fontFamily: fonts.onRegular,
    color: '#000',
    textAlign: 'center',
  },
  bottomContainer: {
    marginVertical: margin(10),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: gap(15),
  },
  phoneText: {
    fontSize: font(12),
    fontFamily: fonts.onSemiBold,
    color: colors.primary,
  },
  phoneBox: {
    width: '80%',
    height: icon(50),
    borderWidth: 1,
    borderColor: '#00000060',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: padding(15),
    flexDirection: 'row',
    gap: gap(10),
  },
  inputBar: {
    width: 1,
    height: icon(30),
    backgroundColor: '#00000050',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: font(14),
    fontFamily: fonts.onMedium,
  },
  button: {
    width: widthResponsive(150),
    height: icon(45),
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: margin(10),
  },
  buttonText: {
    fontSize: font(16),
    fontFamily: fonts.onSemiBold,
    color: '#fff',
  },
  errorText: {
    fontSize: font(12),
    fontFamily: fonts.inRegular,
    color: colors.error,
  },
});

export default Login;
