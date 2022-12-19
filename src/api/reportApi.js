import axiosClient from "./axiosClient";

const reportApi = {
  getDataReportByYear(year) {
    const url = `/reports/revenues/${year}`;
    return axiosClient.get(url);
  },
};

export default reportApi;
