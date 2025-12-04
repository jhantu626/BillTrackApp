import axios from 'axios';
import {API_URL} from './config';
import {getDeviceDetails} from './DeviceInfo';

class WebHook {
  constructor() {
    this.baseUrl = API_URL + 'webhook/';
  }

  async verifyDevice() {
    try {
      const {deviceUniqueKey} = await getDeviceDetails();
      console.log("deviceUniqueKey",deviceUniqueKey);
      const uri = `${this.baseUrl}device-check`;
      const payload = {
        uniqueKey: deviceUniqueKey,
      };
      console.log(uri)
      const response = await axios.post(uri,payload);
      console.log("response",response);
      return response.data;
    } catch (error) {
      return false;
    }
  }
}

const webHook = new WebHook();

export default webHook;
