import axiosClient from "./axiosClient";

const coursesApi = {
  getAll(params) {
    const url = `/courses?page=${params}`;
    return axiosClient.get(url);
  },
  // get course by id
  get(id) {
    const url = `/course/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/course/add`;
    return axiosClient.post(url, data);
  },

  update(id,data) {
    const url = `/course/update/${id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/course/delete/${id}`;
    return axiosClient.delete(url);
  },
  getproductbybrandId(brandId, quantity) {
    const url = `/products/brand/${brandId}/${quantity}`;
    return axiosClient.get(url);
  },
  //get top 8 products newest
  getTop8ProductsNewest() {
    const url = `/products/newest/8`;
    return axiosClient.get(url);
  },
  //get min price
  getMinPrice() {
    const url = `/products/price/min`;
    return axiosClient.get(url);
  },
  //get max price
  getMaxPrice() {
    const url = `/products/price/max`;
    return axiosClient.get(url);
  },
  //get top seller
  getTopSeller() {
    const url = `/products/topseller`;
    return axiosClient.get(url);
  },
  //get top featured
  getTopFeatured() {
    const url = `/products/topfeature`;
    return axiosClient.get(url);
  },
  //get hot trend
  getHotTrend() {
    const url = `/products/hottrend`;
    return axiosClient.get(url);
  },
};

export default coursesApi;
