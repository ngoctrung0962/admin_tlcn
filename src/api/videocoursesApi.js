import axiosClient from "./axiosClient";

const videocoursesApi = {
  getAll(params) {
    const url = `/courses?page=${params}`;
    return axiosClient.get(url);
  },
  // get by course id
  getbycourseId(courseId) {
    const url = `/course-video/${courseId}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = `/course/add`;
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/course-video/edit-info/${id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/course-video/${id}`;
    return axiosClient.delete(url);
  },
  uploadvideo(username, courseId, chapterId, data) {
    const url = `/video/upload/${username}/courses/${courseId}/chapters/${chapterId}`;
    return axiosClient.post(url, data);
  },
  getbychapter(chapterId) {
    const url = `/course-video/chapter/${chapterId}`;
    return axiosClient.get(url);
  },
};

export default videocoursesApi;
