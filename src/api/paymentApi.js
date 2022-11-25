import axiosClient from "./axiosClient";

const paymentApi = {
  getAll(params) {
    const url = `/payments?page=${params}`;
    return axiosClient.get(url);
  },
  delete(id) {
    const url = `/payment/delete/${id}`;
    return axiosClient.delete(url);
  },
  add(data) {
    const url = `/payment/add`;
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `/payment/update/${data.id}`;
    return axiosClient.put(url, data);
  }
};

export default paymentApi;
