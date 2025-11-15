import axios from 'axios';
import {API_URL} from '../utils/config';

class ProductService {
  constructor() {
    this.baseUrl = API_URL + 'product';
  }

  async getProductsSuggestions(token) {
    try {
      const uri = `${this.baseUrl}-suggestion`;
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  // CREATE MULTIPLE PRODUCT
  async createMultipleProduct(token, products) {
    try {
      const uri = `${this.baseUrl}/bulk`;
      const payload = {
        products: products,
      };
      console.log('payload: ', JSON.stringify(payload));
      const response = await axios.post(uri, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  async getAllProducts(token) {
    try {
      const uri = `${this.baseUrl}/all`;
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  async updateproduct(token, {name, id, price, unit, productImage = null}) {
    try {
      const uri = `${this.baseUrl}/update/product`;
      const formData = new FormData();
      formData.append('id', id);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('unitType', unit);
      if (productImage) {
        formData.append('logo', productImage);
      }
      console.log('formData: ', formData);
      const response = await axios.put(uri, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('response: ', response);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
      const data = await error.response.data;
      return data;
    }
  }
}

const productService = new ProductService();

export {productService};
