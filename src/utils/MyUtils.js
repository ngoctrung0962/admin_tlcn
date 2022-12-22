import axios from "axios";
import { callApi } from "./callApi";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment/moment";

export const formatVND = (price) => {
  const formatPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return formatPrice;
};

export const showNotification = (
  icon,
  title,
  text,
  confirmButtonText,
  callBack
) => {
  swal
    .fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonText: confirmButtonText,
      allowOutsideClick: false,
    })
    .then((result) => {
      if (result.isConfirmed) callBack();
    });
};

export const checkQuantity = (newItem, productQuantity, listCart) => {
  console.log(newItem, productQuantity, listCart);
  const result = listCart.filter((item) => {
    if (item.id.productId === newItem.id.productId) {
      if (item.quantity + newItem.quantity > productQuantity) return item;
    }
  });
  console.log(result);
  return result.length > 0 ? false : true;
};

export const showConfirmDeleteDialog = (positiveAction) => {
  showConfirmDialog("Bạn có chắc chắn muốn xóa không?", "Xóa", positiveAction);
};

export const showConfirmDialog = (title, confirmButtonText, positiveAction) => {
  Swal.fire({
    title: title,
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    confirmButtonColor: "#00693e",
    cancelButtonText: "Hủy",
    cancelButtonColor: "#d33",
  }).then((result) => {
    if (result.isConfirmed) {
      positiveAction();
    }
  });
};

/**
 * @description: format date to format dd / mm / yyyy
 * @param {*} date
 * @returns
 */
export const formatDateDisplay = (date, separator = " / ") => {
  return date && moment(date).isValid()
    ? moment(date).format("DD" + separator + "MM" + separator + "YYYY")
    : "";
};
