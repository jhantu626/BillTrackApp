import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Layout} from '../Layout';
import {ProductActiveCard, SecondaryHeader} from '../../Components';
import {productService} from '../../Services/ProductService';
import {useAuthToken} from '../../Contexts/AuthContext';
import {colors} from '../../utils/colors';
import {font, gap, padding} from '../../utils/responsive';
import {fonts} from '../../utils/fonts';
import ToastService from '../../Components/Toasts/ToastService';
import {useProduct} from '../../Contexts/ProductContexts';

const ActiveProducts = () => {
  const {resetProducts} = useProduct();
  const token = useAuthToken();

  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // loading state
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await productService.getAllActiveInactiveProducts(token);
      if (data?.status) {
        setProducts(data.data);
        setOriginalProducts(data.data);
      }
    } catch (error) {
      console.log('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
    Alert.alert(
      '*Notice',
      "• This page contains editable settings.\n• If you make any changes, they will not be saved automatically.\n• Please click the 'Save Changes' button after updating anything.",
    );
  }, [fetchProducts]);

  // Optimized filtering
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;

    const q = searchQuery.toLowerCase();
    return products.filter(item => item.name.toLowerCase().includes(q));
  }, [products, searchQuery]);

  // Optimized toggle function
  const toggle = useCallback(id => {
    setProducts(prev =>
      prev.map(item =>
        item.id === id ? {...item, isActive: !item.isActive} : item,
      ),
    );
  }, []);

  // Optimized save function
  const saveProduct = useCallback(async () => {
    try {
      setIsSaveLoading(true);
      const originalMap = new Map(originalProducts.map(o => [o.id, o]));

      const payload = products.filter(p => {
        const orig = originalMap.get(p.id);
        return orig && orig.isActive !== p.isActive;
      });

      if (!payload || payload.length === 0) {
        ToastService.show({
          message: 'No changes detected',
          type: 'warning',
        });
        return;
      }
      const data = await productService.updateProductStatus(payload);
      if (data?.status) {
        ToastService.show({
          message: 'Products updated successfully',
          type: 'success',
        });
        await fetchProducts();
        const savedProducts = await productService.getAllProducts(token);
        if (savedProducts?.status) {
          console.log(savedProducts);
          await resetProducts(savedProducts.data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaveLoading(false);
    }
  }, [products, originalProducts]);

  return (
    <Layout>
      <SecondaryHeader
        title="Active products"
        query={searchQuery}
        onchangeText={setSearchQuery}
      />

      <FlatList
        style={{flex: 1}}
        contentContainerStyle={styles.listContent}
        data={filteredProducts}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <ProductActiveCard item={item} toggle={toggle} />
        )}
      />

      <TouchableOpacity
        style={styles.floatButton}
        onPress={saveProduct}
        disabled={isSaveLoading}>
        {isSaveLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.floatButtonText}>SAVE CHANGES</Text>
        )}
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    paddingHorizontal: padding(16),
    paddingTop: padding(16),
    paddingBottom: padding(70),
  },
  floatButton: {
    position: 'absolute',
    bottom: gap(25),
    backgroundColor: colors.sucess,
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
