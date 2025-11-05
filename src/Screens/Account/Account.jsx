import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {Layout} from '../Layout';
import {ProfileCard, SecondaryHeader, SettingItemsCard} from '../../Components';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {font, gap, icon, padding} from '../../utils/responsive';
import Lucide from '@react-native-vector-icons/lucide';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import AntDesign from '@react-native-vector-icons/ant-design';
import {useNavigation} from '@react-navigation/native';

const Account = memo(() => {
  const navigation = useNavigation();

  const handleNavigation = ({screen, data = {}}) => {
    navigation.navigate(screen, {
      data,
    });
  };

  return (
    <Layout>
      <SecondaryHeader title="Account Setting" isSearch={false} />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          backgroundColor: '#fff',
          paddingBottom: 50,
        }}>
        <ProfileCard />
        <View style={styles.container}>
          <Pressable style={styles.card}>
            <Image
              source={require('./../../../asset/images/product_icon.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>Sales report</Text>
          </Pressable>
          <Pressable style={styles.card}>
            <Image
              source={require('./../../../asset/images/sales_icon.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>Sales report</Text>
          </Pressable>
        </View>
        <View style={styles.settingContainer}>
          <Text style={styles.settingTitleText}>Settings</Text>
          <SettingItemsCard
            mainIcon={
              <Lucide
                name="baggage-claim"
                size={icon(22)}
                color={colors.primary}
              />
            }
            title="Item master"
          />
          <SettingItemsCard
            onpress={() => handleNavigation({screen: 'Subscription'})}
            mainIcon={
              <Lucide name="crown" size={icon(22)} color={colors.primary} />
            }
            title="Subscriptions"
          />
          <SettingItemsCard
            mainIcon={
              <AntDesign
                name="transaction"
                size={icon(22)}
                color={colors.primary}
              />
            }
            title="Transactions"
          />
          <SettingItemsCard
            mainIcon={
              <Lucide name="headset" size={icon(22)} color={colors.primary} />
            }
            title="Help & supports"
            onpress={()=>handleNavigation({screen: "HelpAndSupport"})}
          />
          <SettingItemsCard
            mainIcon={
              <AntDesign
                name="exclamation-circle"
                size={icon(22)}
                color={colors.primary}
              />
            }
            title="About Billtrack"
          />
          <SettingItemsCard
            mainIcon={
              <MaterialIcons
                name="logout"
                size={icon(22)}
                color={colors.primary}
              />
            }
            title="Logout"
          />
        </View>
        <View style={styles.deleteContainer}>
          <MaterialIcons
            name="delete-outline"
            size={icon(22)}
            color={colors.error}
          />
          <Text style={styles.deleteText}>Delete Account</Text>
        </View>
      </ScrollView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    paddingHorizontal: padding(16),
    paddingVertical: padding(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  card: {
    width: '48%',
    paddingVertical: padding(16),
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    paddingHorizontal: padding(16),
    gap: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
  },
  image: {
    width: icon(24),
    height: icon(24),
  },
  text: {
    fontSize: font(14),
    fontFamily: fonts.popMedium,
    color: '#000',
  },
  settingContainer: {
    paddingHorizontal: padding(16),
    paddingVertical: padding(24),
  },
  settingTitleText: {
    fontSize: font(16),
    fontFamily: fonts.popRegular,
    color: '#6C6C6C',
  },
  deleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gap(16),
    paddingVertical: padding(18),
    paddingHorizontal: padding(16),
    backgroundColor: colors.error + 20,
  },
  deleteText: {
    fontSize: font(14),
    fontFamily: fonts.popMedium,
    color: colors.error,
  },
});

export default Account;
