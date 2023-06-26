import axiosClient from "./axiosClient";

const lectureApi = {
  // Teacher api
  teacherUpdateLecture(data) {
    const url = `/teacher/my-courses/update-lecture`;
    return axiosClient.put(url, data);
  },
};

export default lectureApi;
