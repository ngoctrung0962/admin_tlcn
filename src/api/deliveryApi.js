import { callApi, apiContainData} from '../utils/callApi';

export const getListDeliveriesApi = async () => {
    try {
  
      const res = await callApi(`deliveries`, "GET")
      return res.data
    } catch (error) {
      console.log(error);
    }
};
  