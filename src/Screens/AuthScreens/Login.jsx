import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { AuthLayout } from '../Layout';
import { fonts } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const sendOtp = () => {
    navigation.navigate('Otp');
  };
  return (
    <AuthLayout>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require('./../../../asset/images/login.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Log in to manage your bills</Text>
          <Text numberOfLines={3} style={styles.description}>
            Access your billing dashboard to generate invoices, track payments,
            and manage expenses with ease.
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.phoneText}>Phone number*</Text>
          <View style={styles.phoneBox}>
            <FontAwesome name="phone" size={20} color={colors.primary} />
            <View style={styles.inputBar} />
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} placeholder="+91 9775746484" />
              <FontAwesome
                name="check-circle"
                size={20}
                color={colors.primary}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={sendOtp}>
            <Text style={styles.buttonText}>GET OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
  },
  contentContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.onBold,
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.onRegular,
    color: '#000',
    textAlign: 'center',
  },
  bottomContainer: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  phoneText: {
    fontSize: 12,
    fontFamily: fonts.onSemiBold,
    color: colors.primary,
  },
  phoneBox: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#00000060',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    gap: 10,
  },
  inputBar: {
    width: 1,
    height: 30,
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
    fontSize: 16,
    fontFamily: fonts.onMedium,
  },
  button: {
    width: 150,
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.onSemiBold,
    color: '#fff',
  },
});

export default Login;
