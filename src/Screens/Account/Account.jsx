import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Layout} from '../Layout';
import {ProfileCard, SecondaryHeader} from '../../Components';

const Account = () => {
  return (
    <Layout>
      <SecondaryHeader title="Account Setting" isSearch={false} />
      <ScrollView style={{flex: 1}}>
        <ProfileCard />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({});

export default Account;
