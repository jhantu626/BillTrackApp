import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthLayout} from './../Layout/index';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import {useEffect, useRef, useState} from 'react';
import {GestureHandlerRefContext} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

const OtpVerify = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(180);
  const otpRef = useRef([]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 3) {
      otpRef.current[index + 1].focus();
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
            <Text style={styles.innerDescText}>+91 9775746484</Text> to verify
            and access your account securely.
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
            <TouchableOpacity>
              <Text style={styles.timeText}>{formatTime(timer)}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('BusinessSetup');
          }}>
          <Text style={styles.buttonText}>VERIFY OTP</Text>
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
    gap: 15,
  },
  image: {
    width: 230,
    height: 230,
  },
  topTextContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  titleText: {
    fontSize: 24,
    fontFamily: fonts.onSemiBold,
    color: '#000',
    textAlign: 'center',
  },
  descText: {
    fontSize: 14,
    fontFamily: fonts.onMedium,
    color: '#000',
    textAlign: 'center',
    width: 300,
  },
  innerDescText: {
    fontSize: 14,
    fontFamily: fonts.onSemiBold,
    color: colors.primary,
  },
  otpParent: {
    marginVertical: 10,
    gap: 15,
  },
  otpText: {
    fontSize: 12,
    fontFamily: fonts.onSemiBold,
    color: colors.primary,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    width: '100%',
    height: '100%',
    fontSize: 20,
    fontFamily: fonts.onSemiBold,
    color: colors.primary,
    textAlign: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 14,
    fontFamily: fonts.onRegular,
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  resendText: {
    fontSize: 14,
    fontFamily: fonts.onRegular,
    textAlign: 'center',
  },
  timeText: {
    fontSize: 14,
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
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.onSemiBold,
    color: '#ffffff',
  },
});

export default OtpVerify;
