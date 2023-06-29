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
    changeInfo(username, data) {
        const url = `/account/${username}`;
        return axiosClient.put(url, data);
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
    changepassword(data) {
        const url = `/account/changePassword`;
        return axiosClient.post(url, data);
    },
    changeAvatar(username, data) {
        const url = `/account/${username}/avatar`;
        return axiosClient.post(url, data);
    },
    forgotPassword(email) {
        const url = `/reset-pass/request-link-to-reset?email=${email}`;
        return axiosClient.post(url);
    },
    resetPass(newPass, token) {
        const url = `/reset-password?token=${token}&password=${newPass}`;
        return axiosClient.post(url);
    },
    resetNewPass(token, data) {
        const url = `/account/resetPassword?token=${token}`
        return axiosClient.post(url, data)
    }
};

export default userApi;
