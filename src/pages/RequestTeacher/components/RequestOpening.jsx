import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import Swal from "sweetalert2";
import requestTeacherApi from "../../../api/requestTeacherApi";
import CustomDataTable from "../../../components/CustomDataTable/CustomDataTable.component";
import Dropdown from "../../../components/Dropdown/Dropdown.component";

export default function RequestOpening() {
  const [listOpenning, setListOpenning] = useState([]);
  const [totalOpenning, setTotalOpennig] = useState(0);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  useEffect(() => {
    fetchData();
  }, [paginate]);

  const fetchData = async () => {
    const res = await requestTeacherApi.getOpeningRequest(paginate.page);
    setListOpenning(res.data.content);
    setTotalOpennig(res.data?.totalElements);
  };

  const handleAccept = async (id) => {
    const res = await requestTeacherApi.acceptRequestTeacher(id);
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchData();
    } else {
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleReject = async (id) => {
    const res = await requestTeacherApi.rejectRequestTeacher(id);
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchData();
    } else {
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const columns = [
    {
      name: "Action",
      width: "100px",
      center: true,
      cell: (row) => (
        <Dropdown>
          <MenuItem onClick={() => handleAccept(row.id)}>
            <AiFillEye />
            Chấp nhận yêu cầu
          </MenuItem>
          <MenuItem onClick={() => handleReject(row.id)}>
            <AiFillEye />
            Từ chối yêu cầu
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
      name: "Số điện thoại",
      selector: (row) => row.phone,
      sortable: true,
      reorder: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      reorder: true,
      width: "300px",
      wrap: true,
    },
    {
      name: "Địa chỉ",
      selector: (row) => row.address,
      sortable: true,
      reorder: true,
      width: "200px",
      wrap: true,
    },
    {
      name: "Chủ đề giảng dạy",
      selector: (row) => row.teachingTopic,
      sortable: true,
      reorder: true,
      width: "300px",
      wrap: true,
    },
    {
      name: "Kinh nghiệm giảng dạy",
      selector: (row) => row.expDescribe,
      sortable: true,
      reorder: true,
      width: "300px",
      wrap: true,
    },
    {
      name: "Nghề nghiệp hiện tại",
      selector: (row) => row.currentJob,
      sortable: true,
      reorder: true,
      width: "300px",
      wrap: true,
    },
  ];
  //Navigate to edit page
  const handleEdit = (row) => {};
  return (
    <div className="container__table">
      <CustomDataTable
        columns={columns}
        data={listOpenning}
        paginate={paginate}
        setPaginate={setPaginate}
        count={totalOpenning}
        selectableRows={false}
      />
    </div>
  );
}
