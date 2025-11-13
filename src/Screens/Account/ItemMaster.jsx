import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Layout} from '../Layout';
import {DottedDivider, SecondaryHeader} from '../../Components';
import {font, icon, padding} from '../../utils/responsive';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {fonts} from '../../utils/fonts';
import {colors} from '../../utils/colors';
import Octicons from '@react-native-vector-icons/octicons';
import ItemCard from '../../Components/Cards/ItemCard';

const ItemMaster = () => {
  return (
    <Layout>
      <SecondaryHeader title="Item Master" />
      <ScrollView
        style={{flex: 1, padding: padding(16)}}
        contentContainerStyle={styles.container}>
        <ItemCard expandable={true} />
        <ItemCard />
        <ItemCard />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: padding(16),
  },
});

export default ItemMaster;
