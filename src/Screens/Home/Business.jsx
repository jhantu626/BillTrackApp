import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {SecondaryHeader} from '../../Components';
import {Layout} from '../Layout';
import {font, gap, icon, margin, padding} from '../../utils/responsive';
import {useBusiness} from '../../Contexts/AuthContext';
import {API_URL} from '../../utils/config';
import {colors} from '../../utils/colors';

const Business = () => {
  const business = useBusiness();
  console.log(business);
  console.log(`${API_URL}files/logo/${business?.logoUrl}`);
  return (
    <Layout>
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
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: gap(20),
  },
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
});

export default Business;
