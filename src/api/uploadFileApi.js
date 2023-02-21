import axiosClient from "./axiosClient";
const uploadFileApi = {
  upLoadFile(file) {
    const url = `/upload-files`;
    return axiosClient.post(url, file);
  },
};
export default uploadFileApi;
