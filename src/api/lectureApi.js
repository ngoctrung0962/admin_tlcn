import axiosClient from "./axiosClient";

const lectureApi = {
  // Teacher api
  teacherAddLecture(data) {
    const url = `/teacher/my-courses/add-lecture`;
    return axiosClient.post(url, data);
  },
  teacherUpdateLecture(data) {
    const url = `/teacher/my-courses/update-lecture`;
    return axiosClient.put(url, data);
  },
  teacherDeleteLecture(lectureId) {
    const url = `/teacher/my-courses/delete-lecture/${lectureId}`;
    return axiosClient.delete(url);
  },
};

export default lectureApi;
