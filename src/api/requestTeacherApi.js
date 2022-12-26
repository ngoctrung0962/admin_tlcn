import axiosClient from "./axiosClient";

const requestTeacherApi = {
  getOpeningRequest(page) {
    const url = `/requests-teacher/opening?page=${page}`;
    return axiosClient.get(url);
  },
  getAcceptedRequest(page) {
    const url = `/requests-teacher/accepted?page=${page}`;
    return axiosClient.get(url);
  },
  getRejectedRequest(page) {
    const url = `/requests-teacher/rejected?page=${page}`;
    return axiosClient.get(url);
  },
  acceptRequestTeacher(id) {
    const url = `/accept-request-teacher/${id}`;
    return axiosClient.post(url);
  },
  rejectRequestTeacher(id) {
    const url = `/reject-request-teacher/${id}`;
    return axiosClient.post(url);
  },
};

export default requestTeacherApi;
