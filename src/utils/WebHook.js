import axios from "axios";
import { API_URL } from "./config";
import { getDeviceDetails } from "./DeviceInfo";

class WebHook {
  static baseURL = API_URL + 'webhook/';

  async verifyDevice() {
    try {
      const { deviceUniqueKey } = await getDeviceDetails();
      const uri = `${WebHook.baseURL}device-check/${deviceUniqueKey}`;
      const response = await axios.post(uri);
      return response.data;
    } catch (error) {
      return false;
    }
  }
}

const webHook=new WebHook;

export default webHook;


