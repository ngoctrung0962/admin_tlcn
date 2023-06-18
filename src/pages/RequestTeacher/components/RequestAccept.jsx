import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import requestTeacherApi from "../../../api/requestTeacherApi";
import CustomDataTable from "../../../components/CustomDataTable/CustomDataTable.component";
import Dropdown from "../../../components/Dropdown/Dropdown.component";

export default function RequestAccept() {
  const [loading, setLoading] = useState(false);
  const [listAccept, setlistAccept] = useState([]);
  const [totalAccept, setTotalOpennig] = useState(0);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  useEffect(() => {
    fetchData();
  }, [paginate]);

  const fetchData = async () => {
    setLoading(true);
    const res = await requestTeacherApi.getAcceptedRequest(paginate.page);
    setlistAccept(res.data.content);
    setTotalOpennig(res.data?.totalElements);
    setLoading(false);
  };

  const columns = [
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
      width: "300px",
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
        data={listAccept}
        paginate={paginate}
        setPaginate={setPaginate}
        count={totalAccept}
        selectableRows={false}
        loading={loading}
      />
    </div>
  );
}
