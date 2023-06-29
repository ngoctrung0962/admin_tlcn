import axiosClient from "./axiosClient";

const chapterApi = {
  // getbycourseId(courseId) {
  //   const url = `/courses/${courseId}/chapters`;
  //   return axiosClient.get(url);
  // },
  getbycourseId(courseId) {
    const url = `/manager-course/${courseId}/chapters`;
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

  // Teacher api
  teacherUpdateChapter(data) {
    const url = `/teacher/my-courses/update-chapter`;
    return axiosClient.put(url, data);
  },
  teacherAddChapter(data) {
    const url = `/teacher/my-courses/add-chapter`;
    return axiosClient.post(url, data);
  },
  teacherDeleteChapter(chapterId) {
    const url = `/teacher/my-courses/delete-chapter/${chapterId}`;
    return axiosClient.delete(url);
  },
};

export default chapterApi;
