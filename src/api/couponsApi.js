import axiosClient from "./axiosClient";

const couponsApi = {
  getAll(params) {
    const url = `/coupons?page=${params}`;
    return axiosClient.get(url);
  },
  update(id, data) {
    const url = `/coupon/update/${id}`;
    return axiosClient.put(url, data);
  },
  add(data) {
    const url = `/coupon/add-new`;
    return axiosClient.post(url, data);
  },
  delete(id) {
    const url = `/coupon/delete/${id}`;
    return axiosClient.delete(url);
  }
};

export default couponsApi;
