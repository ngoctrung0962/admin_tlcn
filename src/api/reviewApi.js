import axiosClient from "./axiosClient";

const reviewApi = {
  getAll() {
    const url = "/reviews";
    return axiosClient.get(url);
  },
  // get 10 products first
  get(id) {
    const url = `/reviews/course/${id}`;
    return axiosClient.get(url);
  },
  getReviewByCourseId(id) {
    const url = `/reviews/course/${id}`;
    return axiosClient.get(url);
  },
  add( data) {
    const url = `/review/add`;
    return axiosClient.post(url,data);
  },

  update(data, id, username) {
    const url = `/reviews/${username}/${id}`;
    return axiosClient.put(url, data);
  },

  remove(username, id) {
    const url = `/reviews/${username}/${id}`;
    return axiosClient.delete(url);
  },
  getreviewbyproductId(productId) {
    const url = `/reviews/product/${productId}`;
    return axiosClient.get(url);
  },
};

export default reviewApi;
