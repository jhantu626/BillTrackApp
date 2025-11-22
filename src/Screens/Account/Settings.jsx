import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Layout} from '../Layout';
import {SecondaryHeader} from '../../Components';

const Settings = () => {
  return (
    <Layout>
      <SecondaryHeader
        title="Settings"
        isSearch={false}
        isQuestion={false}
        isNotification={false}
      />
      
    </Layout>
  );
};

export default Settings;

const styles = StyleSheet.create({});
