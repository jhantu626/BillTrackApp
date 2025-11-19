import axios from 'axios';
import {API_URL} from '../utils/config';

class InvoiceService {
  constructor() {
    this.baseUrl = API_URL + 'invoice/';
  }

  async createInvoice({token, customerNumber, items = []}) {
    try {
      const uri = this.baseUrl;
      const payload = {
        status: 'paid',
        customerNumber: customerNumber,
        items: items,
      };
      const response = await axios.post(uri, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response', JSON.stringify(response));
      const data = await response.data;
      return data;
    } catch (error) {
      console.log('error', error);
      const data = await error.response.data;
      return data;
    }
  }

  async getInvoices(token, page, limit) {
    try {
      const uri = this.baseUrl;
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data=await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }
}

const invoiceService = new InvoiceService();

export {invoiceService};
