import axiosClient from "./axiosClient";

const reportApi = {
  getDataReportByYear(year) {
    const url = `/reports/revenues/${year}`;
    return axiosClient.get(url);
  },
  getDataReportByMonth(year, month) {
    const url = `/reports/revenues/${year}/${month}`;
    return axiosClient.get(url);
  },
};

export default reportApi;
