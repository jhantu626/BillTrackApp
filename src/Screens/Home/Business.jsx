import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  CommonModal,
  NavigationCardWithValue,
  SecondaryHeader,
} from '../../Components';
import {Layout} from '../Layout';
import {font, gap, icon, margin, padding} from '../../utils/responsive';
import {useBusiness} from '../../Contexts/AuthContext';
import {API_URL} from '../../utils/config';
import {colors} from '../../utils/colors';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Lucide from '@react-native-vector-icons/lucide';
import Ionicons from '@react-native-vector-icons/ionicons';
import {businessCategoryService} from '../../Services/BusinessCategoryService';

const Business = () => {
  const business = useBusiness();
  const [businessCategory, setBusinessCategory] = useState([]);
  const [isModal, setIsModal] = useState(true);

  const fetchBusinessCategory = async () => {
    try {
      const data = await businessCategoryService.getAllBusinessCategory();
      setBusinessCategory(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchBusinessCategory();
  }, []);

  return (
    <Layout>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <SecondaryHeader title="Business Setting" isSearch={false} />
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
          <View style={[styles.rowContainer, styles.profileContainer]}>
            <LinearGradient
              colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.gradientBorder}>
              <Image
                style={styles.profileImage}
                resizeMode="contain"
                source={{uri: `${API_URL}files/logo/${business?.logoUrl}`}}
              />
            </LinearGradient>
            <View style={styles.profileSubContainer}>
              <Text style={styles.label}>
                Business Name <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.businessNameContainer}>
                <Text style={styles.businessNameText}>{business?.name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text>Primary Information</Text>
            <View style={styles.primaryInfoContainer}>
              <NavigationCardWithValue
                mainIcon={
                  <MaterialIcons
                    name="phone"
                    size={icon(20)}
                    color={colors.primary}
                  />
                }
                title="Phone Number"
                onpress={() => {}}
                textFontSize={14}
                disabled={false}
                value={business?.phoneNumber}
              />
              <NavigationCardWithValue
                mainIcon={
                  <MaterialIcons
                    name="email"
                    size={icon(20)}
                    color={colors.primary}
                  />
                }
                title="Email Address"
                onpress={() => {}}
                textFontSize={14}
                disabled={false}
                value={business?.email}
              />
              <NavigationCardWithValue
                mainIcon={
                  <Lucide
                    name="layout-dashboard"
                    size={icon(20)}
                    color={colors.primary}
                  />
                }
                title="Business Category"
                onpress={() => {}}
                textFontSize={14}
                disabled={false}
                value={
                  businessCategory.find(
                    item => item.id === business?.businessCategoryId,
                  )?.name
                }
              />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text>Business Information</Text>
            <View style={styles.primaryInfoContainer}>
              <NavigationCardWithValue
                mainIcon={
                  <Lucide
                    name="badge-percent"
                    size={icon(20)}
                    color={colors.primary}
                  />
                }
                title="GST Number"
                onpress={() => {}}
                textFontSize={14}
                disabled={false}
                value={business?.gstNumber}
              />
              <NavigationCardWithValue
                mainIcon={
                  <Ionicons
                    name="location-outline"
                    size={icon(20)}
                    color={colors.primary}
                  />
                }
                title="Business Address"
                onpress={() => {}}
                textFontSize={14}
                disabled={false}
                value={`${business?.city}, ${business?.pinCode}`}
              />
            </View>
          </View>
        </ScrollView>
        <CommonModal visible={isModal}>
          <Text>Modal Open</Text>
        </CommonModal>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},
  rowContainer: {
    backgroundColor: '#fff',
    marginVertical: margin(16),
    padding: padding(16),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gap(16),
  },
  businessNameContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: padding(16),
    paddingVertical: padding(14),
  },
  profileSubContainer: {
    flex: 1,
    gap: gap(8),
  },
  businessNameText: {
    color: '#00000090',
    fontSize: font(14),
    fontWeight: '500',
  },
  required: {
    color: 'red',
  },
  label: {
    fontSize: font(14),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  gradientBorder: {
    width: icon(70),
    height: icon(70),
    borderRadius: icon(70),
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: icon(64),
    height: icon(64),
    borderRadius: icon(64),
    backgroundColor: '#fff',
  },
  primaryInfoContainer: {
    marginVertical: gap(10),
  },
});

export default Business;
