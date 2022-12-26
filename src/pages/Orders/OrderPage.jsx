import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";

import CustomDataTable from "../../components/CustomDataTable/CustomDataTable.component";
import Dropdown from "../../components/Dropdown/Dropdown.component";
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { formatDateDisplay } from "../../utils/MyUtils";
import orderApi from "../../api/orderApi";

const OrderPage = () => {
  const [listOrders, setListOrders] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  const [totalOrder, setTotalOrder] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await orderApi.getAllListHistoryOrder(paginate.page);
      setListOrders(res.data.content);
      setTotalOrder(res.data.totalElements);
    };
    fetchData();
  }, [paginate]);
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const handleEdit = (row) => {
    setShow(true);
    // nav(`${row.id}`);
  };
  const columns = [
    {
      name: "Action",
      minWidth: "100px",
      maxWidth: "100px",
      center: true,
      cell: (row) => (
        <Dropdown>
          <MenuItem onClick={() => handleEdit(row)}>
            <AiFillEye />
            Xem
          </MenuItem>

          <MenuItem>
            <BiHistory />
            Lịch sử
          </MenuItem>
        </Dropdown>
      ),
    },
    {
      name: "OrderId",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      name: "User name",
      selector: (row) => row.username,
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      name: "Danh sách khóa học",
      selector: (row) => (
        <ul className="my-2 p-0">
          {row?.orderDetailList?.map((item, index) => {
            return (
              <li className="m-0 p-0 mb-2">
                <span style={{ color: "#00693e", fontWeight: "bold" }}>
                  STT: {index + 1}{" "}
                </span>
                <span style={{ color: "red" }}>ID: </span>
                {item.id} / <span style={{ color: "red" }}>Tên: </span>
                {item.name}
              </li>
            );
          })}
        </ul>
      ),
      sortable: true,
      reorder: true,
      minWidth: "350px",
      maxWidth: "350px",
      wrap: true,
    },

    {
      name: "Thành tiền",
      selector: (row) =>
        row.totalPrice.toLocaleString("vi-VN", {
          currency: "VND",
        }),
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      name: "Tổng số tiền thanh toán",
      selector: (row) =>
        row.paymentPrice.toLocaleString("vi-VN", {
          currency: "VND",
        }),
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      name: "Mã khuyến mãi",
      selector: (row) => row.couponCode,
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      name: "Khuyến mãi giảm",
      selector: (row) => {
        console.log(typeof row.totalPrice);
        return (row.totalPrice - row.paymentPrice).toLocaleString("vi-VN", {
          currency: "VND",
        });
      },
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      name: "Phương thức thanh toán",
      selector: (row) => row.paymentName,
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      name: "Ngày tạo",
      selector: (row) => formatDateDisplay(row.createDate),
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title ">Tất cả đơn hàng</h3>
        <div className="content__tool">{/* O */}</div>
      </div>
      <div className="container">
        {columns && (
          <CustomDataTable
            columns={columns}
            data={listOrders}
            paginate={paginate}
            setPaginate={setPaginate}
            count={totalOrder}
            selectableRows={false}
          />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
