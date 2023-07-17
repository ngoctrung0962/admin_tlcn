import axiosClient from "./axiosClient";

const reviewerApi = {
  getListReviewers(page) {
    const url = `/reviewers?page=${page}`;
    return axiosClient.get(url);
  },
  addReviewer(data) {
    const url = `/account/reviewers/register`;
    return axiosClient.post(url, data);
  },
  getDetailReviewer(username) {
    const url = `/account/reviewers/${username}/detail`;
    return axiosClient.get(url);
  },
};

export default reviewerApi;
