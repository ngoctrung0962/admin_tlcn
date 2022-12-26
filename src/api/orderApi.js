import axiosClient from "./axiosClient";

const orderApi = {
  getallorderdetailbyusername(username) {
    const url = `/order-details/username/${username}`;
    return axiosClient.get(url);
  },

  getallorderbyusername(username) {
    const url = `/orders/username/${username}`;
    return axiosClient.get(url);
  },
  getAllListHistoryOrder(page) {
    const url = `/orders?page=${page}`;
    return axiosClient.get(url);
  },
};

export default orderApi;
