import axiosClient from "./axiosClient";

const chapterApi = {
  getbycourseId(courseId) {
    const url = `/courses/${courseId}/chapters`;
    return axiosClient.get(url);
  },

  addIntoCourse(courseId, data) {
    const url = `/courses/${courseId}/chapters`;
    return axiosClient.post(url, data);
  },

  update(courseId, data) {
    const url = `/courses/${courseId}/chapters/${data.id}`;
    return axiosClient.put(url, data);
  },

  remove(courseId, chapterId) {
    const url = `/courses/${courseId}/chapters/${chapterId}`;
    return axiosClient.delete(url);
  },
};

export default chapterApi;
