import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthLayout} from './../Layout/index';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {font, gap, icon, margin, widthResponsive} from '../../utils/responsive';
import {authService} from '../../Services/AuthService';
import {useAuth} from '../../Contexts/AuthContext';
import {businessService} from '../../Services/BusinessService';

const OtpVerify = () => {
  const {login, setBusinessData} = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(180);
  const otpRef = useRef([]);
  const {mobile} = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const validateOtp = async ({parameterOtp = null}) => {
    try {
      setIsLoading(true);
      const newOtp = parameterOtp || otp.join('');
      if (newOtp.length !== 4) return;
      const data = await authService.validateOtp(mobile, newOtp);
      if (data?.status) {
        await login(data?.token, data?.data);
        if (data?.data?.businessId) {
          const businessData = await businessService.getBusiness(data?.token);
          setBusinessData(businessData?.data);
        }
      } else {
        setOtp(['', '', '', '']);
        otpRef.current[0].focus();
        ToastAndroid.show(data?.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      if (timer > 0) return;
      const data = await authService.login(mobile);
      if (data?.status) {
        setTimer(180);
        ToastAndroid.show(data?.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(data?.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const handleChange = async (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 3) {
      otpRef.current[index + 1].focus();
    }
    const newOtpString = newOtp.join('');
    if (newOtpString.length === 4) {
      await validateOtp({parameterOtp: newOtpString});
    }
  };

  useEffect(() => {
    otpRef.current[0].focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  return (
    <AuthLayout>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('./../../../asset/images/verify-otp.png')}
        />
        <View style={styles.topTextContainer}>
          <Text style={styles.titleText}>Verify Your Mobile Number</Text>
          <Text style={styles.descText} numberOfLines={2}>
            Enter the OTP sent to{' '}
            <Text style={styles.innerDescText}>+91 {mobile}</Text> to verify and
            access your account securely.
          </Text>
        </View>
        <View style={styles.otpParent}>
          <Text style={styles.otpText}>Enter Your Otp</Text>
          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <View
                key={index}
                style={[
                  styles.otpBox,
                  value !== '' && {
                    backgroundColor: colors.primary,
                  },
                ]}>
                <TextInput
                  ref={ref => (otpRef.current[index] = ref)}
                  value={value}
                  keyboardType="numeric"
                  maxLength={1}
                  style={[
                    styles.otpInput,
                    value !== '' && {
                      color: '#ffffff',
                    },
                  ]}
                  selectionColor={value !== '' ? '#ffffff' : colors.primary}
                  onChangeText={text => {
                    handleChange(text, index);
                  }}
                  onKeyPress={e => {
                    if (e.nativeEvent.key === 'Backspace' && index > 0) {
                      otpRef.current[index - 1].focus();
                    }
                  }}
                />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Didn’t receive the OTP?</Text>
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Resend in</Text>
            <TouchableOpacity onPress={handleResendOtp} disabled={timer > 0}>
              <Text style={styles.timeText}>
                {timer > 0 ? formatTime(timer) : 'Resend'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={validateOtp}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>VERIFY OTP</Text>
          )}
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
    gap: gap(15),
  },
  image: {
    width: icon(230),
    height: icon(230),
  },
  topTextContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: gap(10),
  },
  titleText: {
    fontSize: font(24),
    fontFamily: fonts.onSemiBold,
    color: '#000',
    textAlign: 'center',
  },
  descText: {
    fontSize: font(14),
    fontFamily: fonts.onMedium,
    color: '#000',
    textAlign: 'center',
    width: widthResponsive(300),
  },
  innerDescText: {
    fontSize: font(14),
    fontFamily: fonts.onSemiBold,
    color: colors.primary,
  },
  otpParent: {
    marginVertical: margin(10),
    gap: gap(15),
  },
  otpText: {
    fontSize: font(12),
    fontFamily: fonts.onSemiBold,
    color: colors.primary,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: gap(15),
  },
  otpBox: {
    width: icon(50),
    height: icon(50),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    width: '100%',
    height: '100%',
    fontSize: font(20),
    fontFamily: fonts.onSemiBold,
    color: colors.primary,
    textAlign: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  bottomText: {
    fontSize: font(14),
    fontFamily: fonts.onRegular,
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gap(5),
  },
  resendText: {
    fontSize: font(14),
    fontFamily: fonts.onRegular,
    textAlign: 'center',
  },
  timeText: {
    fontSize: font(14),
    fontFamily: fonts.onSemiBold,
    textAlign: 'center',
    color: colors.primary,
  },
  button: {
    width: 150,
    height: 45,
    borderRadius: 5,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: margin(5),
  },
  buttonText: {
    fontSize: font(16),
    fontFamily: fonts.onSemiBold,
    color: '#ffffff',
  },
});

export default OtpVerify;
