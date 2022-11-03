
import { callApi, apiContainData} from '../utils/callApi'

export const getListDiscountsApi = async () => {
  try {

    const res = await callApi(`coupons`, "GET")
    return res.data
  } catch (error) {
    console.log(error);
  }
};

export const getDiscountApi = async (itemId) => {
    try {
  
      const res = await callApi(`coupons/${itemId}`, "GET")
      return res.data
    } catch (error) {
      console.log(error);
    }
  };


export const insertDiscountApi = async (item) => {
  try {
    const res = await apiContainData(`coupons`, 'POST', item);
    return res;
  }
  catch (error) {
    console.log(error);
  }
}

export const deleteDiscountApi = async (itemID) => {
  try {
    const res = await callApi(`coupons/${itemID}`, "DELETE");
    return res.data

  } catch (error) {
    console.log(error);
  }
}

export const updateCartApi = async (itemId, data) => {
  try {
    const res = await apiContainData(`coupons/${itemId}`, "PUT", data);
    return res.data

  } catch (error) {
    console.log(error);
  }
}



