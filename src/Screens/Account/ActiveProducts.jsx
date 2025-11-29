import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Layout} from '../Layout';
import {ProductActiveCard, SecondaryHeader} from '../../Components';
import {productService} from '../../Services/ProductService';
import {useAuthToken} from '../../Contexts/AuthContext';
import {colors} from '../../utils/colors';
import {font, gap, padding} from '../../utils/responsive';
import {fonts} from '../../utils/fonts';

const ActiveProducts = () => {
  const token = useAuthToken();

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAllActiveInactiveProducts(token);
      if (data?.status) {
        setProducts(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Layout>
      <SecondaryHeader title="Active products" />
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: padding(16),
          paddingTop: padding(16),
          paddingBottom: padding(60),
        }}
        data={products}
        keyExtractor={(_, index) => index.toString() + 'products'}
        renderItem={({item}, index) => {
          return <ProductActiveCard item={item} />;
        }}
      />
      <TouchableOpacity style={styles.floatButton}>
        <Text style={styles.floatButtonText}>SAVE CHANGES</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  floatButton: {
    position: 'absolute',
    bottom: gap(25),
    backgroundColor: '#28A745',
    paddingHorizontal: padding(16),
    paddingVertical: padding(10),
    borderRadius: gap(10),
    alignSelf: 'center',
  },
  floatButtonText: {
    color: '#fff',
    fontSize: font(14),
    fontFamily: fonts.inMedium,
  },
});

export default ActiveProducts;
