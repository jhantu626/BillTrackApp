import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {Layout} from '../Layout';
import {NavigationCard, SecondaryHeader} from '../../Components';
import {margin, padding} from '../../utils/responsive';
import {colors} from '../../utils/colors';

const About = memo(() => {
  return (
    <Layout>
      <SecondaryHeader title="About billtrack" isSearch={false} />
      <ScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        contentContainerStyle={styles.container}>
        <View style={styles.contentContainer}>
          <NavigationCard title={'About Billtrack App'} />
          <NavigationCard title={'Privacy Policy'} />
          <NavigationCard title={'Terms & Conditions'} />
          <NavigationCard title={'Cancelation Policy'} />
        </View>
      </ScrollView>
    </Layout>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: padding(10),
    marginBottom: margin(10),
  },
  contentContainer: {
    paddingHorizontal: padding(16),
    borderTopWidth: 0.8,
    borderColor: colors.border,
  },
});

export default About;
