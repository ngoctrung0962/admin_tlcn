import { callApi, apiContainData } from "../utils/callApi";

export const getListOrdersApi = async (idUser) => {
  try {
    const res = await callApi(`orders/username/${idUser}`, "GET");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const insertOrderApi = async (order, username, listOrdersDetail) => {
  const res = await apiContainData(`orders/${username}`, "POST", order);
  console.log(res);
  if (res.errorCode === "") {
    listOrdersDetail.map((item) => (item.id.orderId = res.data.orderId));
    try {
      const resData = await apiContainData(
        `order-details/${username}`,
        "POST",
        listOrdersDetail
      );
      if (resData.status !== 200) {
        return resData;
      }
    } catch (error) {
      return error;
    }
  }
  return res;
};
