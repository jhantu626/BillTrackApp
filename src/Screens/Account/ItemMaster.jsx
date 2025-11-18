import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {Layout} from '../Layout';
import {
  ItemCardShimmer,
  SecondaryHeader,
  ToastContainer,
} from '../../Components';
import {font, gap, padding} from '../../utils/responsive';
import {fonts} from '../../utils/fonts';
import ItemCard from '../../Components/Cards/ItemCard';
import {productService} from '../../Services/ProductService';
import {useAuthToken} from '../../Contexts/AuthContext';
import ToastService from '../../Components/Toasts/ToastService';
import {useNavigation} from '@react-navigation/native';

const ItemMaster = () => {
  const navigation = useNavigation();
  const token = useAuthToken();

  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  /** Fetch Items */
  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await productService.getProductsSuggestions(token);
      setProducts(data?.data || []);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  /** Handle Set Price */
  const handleSetPrice = useCallback(async () => {
    if (selectedItems.length === 0) {
      Alert.alert(
        'No Product Selected',
        'No products selected. Do you want to skip?',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'YES',
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{name: 'Product'}],
              }),
          },
        ],
        {cancelable: false},
      );

      ToastService.show({
        message: 'Please select at least one item',
        type: 'error',
        position: 'top',
      });
      return;
    }

    const finalPayload = selectedItems.map(item => ({
      name: item?.name,
      hsnId: item?.hsnId,
      unitType: item?.unitType,
      description: item?.description,
      logo: item?.logo,
    }));
    try {
      setIsSaveLoading(true);
      const data = await productService.createMultipleProduct(
        token,
        finalPayload,
      );
      if (data?.status) {
        ToastService.show({
          message: data?.message,
          type: 'success',
          position: 'top',
        });
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Product',
              params: {
                doRefresh: true,
              },
            },
          ],
        });
      }
    } catch (error) {
    } finally {
      setIsSaveLoading(false);
    }
  }, [navigation, selectedItems, token]);

  /** Render List Item (Memoized) */
  const renderItem = useCallback(
    ({item, index}) => (
      <ItemCard
        products={item}
        expandable={index === 0}
        selectedItems={selectedItems}
        setSelectedItem={setSelectedItems}
      />
    ),
    [selectedItems],
  );

  /** Stable keyExtractor */
  const keyExtractor = useCallback(
    (item, index) => item?.id?.toString() || `${index}_itemCard`,
    [],
  );

  return (
    <Layout>
      <SecondaryHeader title="Item Master" />

      {isLoading ? (
        <View style={styles.shimmerWrapper}>
          <ItemCardShimmer />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.container}
          data={products}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}

      <View style={styles.bottomContainer}>
        <View style={styles.bottomLeftContainer}>
          <Text style={styles.bottomTitleText}>Selected Product</Text>
          <Text style={styles.bottomSubValueText}>{selectedItems.length}</Text>
        </View>

        <TouchableOpacity style={styles.btnContainer} onPress={handleSetPrice}>
          {isSaveLoading ? (
            <ActivityIndicator color="#fff" size={'small'} />
          ) : (
            <Text style={styles.btnText}>SET PRICE</Text>
          )}
        </TouchableOpacity>
      </View>

      <ToastContainer />
    </Layout>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: padding(16),
  },
  shimmerWrapper: {
    flex: 1,
    padding: padding(16),
  },
  container: {
    gap: gap(16),
    paddingBottom: padding(25),
  },
  bottomContainer: {
    width: '100%',
    paddingVertical: padding(13),
    paddingHorizontal: padding(16),
    backgroundColor: '#40599B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomLeftContainer: {
    alignItems: 'flex-start',
  },
  bottomTitleText: {
    fontSize: font(14),
    fontFamily: fonts.inMedium,
    color: '#fff',
  },
  bottomSubValueText: {
    fontSize: font(24),
    fontFamily: fonts.inBold,
    color: '#fff',
  },
  btnContainer: {
    paddingVertical: padding(10),
    paddingHorizontal: padding(20),
    backgroundColor: '#EA6B23',
    borderRadius: 5,
  },
  btnText: {
    fontSize: font(12),
    fontFamily: fonts.inBold,
    color: '#fff',
  },
});

export default ItemMaster;
