import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../utils/colors';

const Layout = ({children}) => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: colors.primaryBackground}}
      edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
      {children}
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({});
