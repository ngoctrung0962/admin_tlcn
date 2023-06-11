import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import paymentApi from "../../api/paymentApi";
import requestTeacherApi from "../../api/requestTeacherApi";
import CustomDataTable from "../../components/CustomDataTable/CustomDataTable.component";
import Dropdown from "../../components/Dropdown/Dropdown.component";
import RequestAccept from "./components/RequestAccept";
import RequestOpening from "./components/RequestOpening";
import RequestReject from "./components/RequestReject";

const RequestTeacherPage = () => {
  const [listPayments, setlistPayments] = useState([]);
  const [totalPayments, settotalPayments] = useState(0);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  useEffect(() => {
    fetchData();
  }, [paginate]);

  const fetchData = async () => {
    const res = await requestTeacherApi.getOpeningRequest(paginate.page);
    setlistPayments(res.data.content);
    settotalPayments(res.data?.totalElements);
  };

  //Navigate to edit page
  const handleEdit = (row) => {};

  const handleDelete = async (row) => {
    try {
      const res = await paymentApi.delete(row.id);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Xóa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Xóa thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };
  const columns = [
    {
      name: "Action",
      width: "100px",
      center: true,
      cell: (row) => (
        <Dropdown>
          <MenuItem onClick={() => handleEdit(row)}>
            <AiFillEye />
            Xem
          </MenuItem>
          <MenuItem onClick={() => handleDelete(row)}>
            <AiFillDelete />
            Xóa
          </MenuItem>
          <MenuItem>
            <BiHistory />
            Lịch sử
          </MenuItem>
        </Dropdown>
      ),
    },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Tên phương thức thanh toán",
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
  ];
  const handleDeleteRowSelected = async (list) => {
    await Promise.all(
      list.map(async (row, index) => {
        try {
          const res = await paymentApi.delete(row.id);
          if (index === list.length - 1) {
            if (res.errorCode === "") {
              Swal.fire({
                icon: "success",
                title: "Xóa thành công",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Xóa thất bại",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          }
        } catch (error) {}
      })
    );

    // for (let index = 0; index < list.length; index++) {
    //   try {
    //     const res = await paymentApi.delete(list[index].code);
    //     if (index === list.length - 1) {
    //       if (res.errorCode === "") {
    //         Swal.fire({
    //           icon: "success",
    //           title: "Xóa thành công",
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });
    //       } else {
    //         Swal.fire({
    //           icon: "error",
    //           title: "Xóa thất bại",
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });
    //       }
    //     }
    //   } catch (error) {}
    // }
    fetchData();
  };
  const nav = useNavigate();
  return (
    <div className="container-fluid">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">
          Tất cả yêu cầu trở thành giảng viên
        </h3>
        <div className="content__tool"></div>
      </div>
      <Tabs
        defaultActiveKey="openning"
        id="uncontrolled-tab-example"
        className="mb-3"
        unmountOnExit
      >
        <Tab eventKey="openning" title="Chưa phê duyệt">
          <RequestOpening />
        </Tab>
        <Tab eventKey="approved" title="Đã phê duyệt">
          <RequestAccept />
        </Tab>
        <Tab eventKey="rejected" title="Đã từ chối">
          <RequestReject />
        </Tab>
      </Tabs>
    </div>
  );
};

export default RequestTeacherPage;
