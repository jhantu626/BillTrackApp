import {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductContext = createContext();

const STORAGE_KEY = 'PRODUCTS';

const ProductProvider = ({children}) => {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) setProducts(JSON.parse(data));
      } catch (error) {
        console.log('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Products));
  }, [Products]);

  const addProduct = async product => {
    setProducts(prev => {
      const exists = prev.find(p => p.id === product.id);

      if (exists) {
        return prev.map(p => (p.id === product.id ? product : p));
      } else {
        return [...prev, product];
      }
    });
  };

  const removeProduct = async id => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const resetProducts = async (productList = []) => {
    setProducts(productList);
  };

  return (
    <ProductContext.Provider
      value={{
        Products,
        addProduct,
        removeProduct,
        resetProducts,
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

export const useProduct = () => useContext(ProductContext);
