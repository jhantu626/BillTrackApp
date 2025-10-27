import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Layout} from '../Layout';
import {SecondaryHeader} from '../../Components';

const CreateBill = () => {
  return (
    <Layout>
      <SecondaryHeader title="Create Bill" />
      <ScrollView style={{flex: 1}}></ScrollView>
      <View>
        <Text>Helloworld</Text>
      </View>
    </Layout>
  );
};

export default CreateBill;

const styles = StyleSheet.create({});
