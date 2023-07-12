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

  update(id, data) {
    const url = `/course/update/${id}`;
    return axiosClient.put(url, data);
  },

  remove(id) {
    const url = `/course/delete/${id}`;
    return axiosClient.delete(url);
  },
  // getproductbybrandId(brandId, quantity) {
  //   const url = `/products/brand/${brandId}/${quantity}`;
  //   return axiosClient.get(url);
  // },
  // //get top 8 products newest
  // getTop8ProductsNewest() {
  //   const url = `/products/newest/8`;
  //   return axiosClient.get(url);
  // },
  // //get min price
  // getMinPrice() {
  //   const url = `/products/price/min`;
  //   return axiosClient.get(url);
  // },
  // //get max price
  // getMaxPrice() {
  //   const url = `/products/price/max`;
  //   return axiosClient.get(url);
  // },
  // //get top seller
  // getTopSeller() {
  //   const url = `/products/topseller`;
  //   return axiosClient.get(url);
  // },
  // //get top featured
  // getTopFeatured() {
  //   const url = `/products/topfeature`;
  //   return axiosClient.get(url);
  // },
  // //get hot trend
  // getHotTrend() {
  //   const url = `/products/hottrend`;
  //   return axiosClient.get(url);
  // },

  initSection() {
    const url = `/register-course/init-session`;
    return axiosClient.post(url);
  },

  submitNewSumary(data) {
    const url = `/register-course/register-new-summary-info?isFinish=true`;
    return axiosClient.post(url, data);
  },
  updateSumaryInfo(sessionId, data) {
    const url = `/register-course/update-summary-info/${sessionId}?isFinish=true`;
    return axiosClient.post(url, data);
  },
  submitSumary(data) {
    const url = `/register-course/submit-summary-info?isFinish=true`;
    return axiosClient.post(url, data);
  },

  submitContent(data) {
    const url = `/register-course/submit-content?isFinish=true`;
    return axiosClient.post(url, data);
  },
  submitRequest(sessionId) {
    const url = `/register-course/submit-request?sessionId=${sessionId}`;
    return axiosClient.post(url);
  },
  getListCourseRegister() {
    const url = `/register-course/inquire?status=DRAFT`;
    return axiosClient.get(url);
  },
  getListCourseRegisterByStatus(status) {
    const url = `/register-course/my-requests?status=${status}`;
    return axiosClient.get(url);
  },
  // api for reviewer
  getListCourseNotHaveReviewer() {
    const url = `/reviewer/register-course/tasks`;
    return axiosClient.get(url);
  },
  getListTaskOfReviewer(status) {
    const url = `/reviewer/register-course/my-tasks?status=${status}`;
    return axiosClient.get(url);
  },
  reviewerGetCourseDetail(courseId) {
    const url = `/register-course?sessionId=${courseId}`;
    return axiosClient.get(url);
  },
  reviewerApproveCourse(data) {
    const url = `/register-course/submit-result-review`;
    return axiosClient.post(url, data);
  },
  assingTaskToReviewer(sessionId) {
    const url = `/reviewer/register-course/assign-task/${sessionId}`;
    return axiosClient.post(url);
  },

  // Teacher api
  getListCourseOfTeacher(paginate) {
    const url = `/teacher/my-courses?page=${paginate.page}&limit=${paginate.limit}`;
    return axiosClient.get(url);
  },
  teacherGetCourseDetail(courseId) {
    const url = `/teacher/my-courses/${courseId}`;
    return axiosClient.get(url);
  },
  teacherUpdateSumaryInfo(data) {
    const url = `/teacher/my-courses/update-summary`;
    return axiosClient.post(url, data);
  },

  teacherStopSellCourse(courseId) {
    const url = `/teacher/my-courses/${courseId}/un-active`;
    return axiosClient.post(url);
  },
  teacherStartSellCourse(courseId) {
    const url = `/teacher/my-courses/${courseId}/active`;
    return axiosClient.post(url);
  },

  adminGetListCourse(paginate) {
    const url = `/courses?page=${paginate.page}&limit=${paginate.limit}`;
    return axiosClient.get(url);
  },
};

export default coursesApi;
