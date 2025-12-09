import axios from 'axios';
import {API_URL} from '../utils/config';

class SubscriptionService {
  constructor() {
    this.baseUrl = API_URL + 'subscription';
  }

  async currentSubscription(token) {
    try {
      const uri = this.baseUrl + '/current-subscription';
      const response = await axios.get(uri, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  async purchaseSubscription({
    token,
    plan,
    orderId,
    paymentId,
    paymentSignature,
  }) {
    try {
      const uri = this.baseUrl;
      const payload = {
        plan: plan,
        orderId: orderId,
        paymentId: paymentId,
        paymentSignature: paymentSignature,
      };
      const response = await axios.post(uri, payload, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }
}

const subscriptionService = new SubscriptionService();

export {subscriptionService};
