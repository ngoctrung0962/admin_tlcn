import axiosClient from "./axiosClient";

const userApi = {
  register(username, password, data) {
    const header = {
      username: username,
      password: password,
    };
    const url = `/register`;
    return axiosClient.post(url, data, {
      headers: header,
    });
  },
  get(username) {
    const url = `/account/detail/${username}`;
    return axiosClient.get(url);
  },
  update(username, data) {
    const url = `/users/${username}`;
    return axiosClient.put(url, data);
  },
  login(data) {
    const url = `/login`;
    return axiosClient.post(url, data);
  },
  loginAdminOrTeacher(data) {
    const url = `/login/admin`;
    return axiosClient.post(url, data);
  },
  changepassword(username, data) {
    const url = `/change-password/${username}`;
    return axiosClient.post(url, data);
  },
  forgotPassword(username, email) {
    const url = `/forgot-password/${username}?email=${email}`;
    return axiosClient.post(url);
  },
  resetPass(newPass, token) {
    const url = `/reset-password?token=${token}&password=${newPass}`;
    return axiosClient.post(url);
  },
};

export default userApi;
