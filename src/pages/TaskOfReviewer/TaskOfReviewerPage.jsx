import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import coursesApi from "../../api/coursesApi";
import CustomDataTable from "../../components/CustomDataTable/CustomDataTable.component";
import Dropdown from "../../components/Dropdown/Dropdown.component";
import { formatDateDisplay } from "../../utils/MyUtils";
import { Enums } from "../../utils/Enums";
const TaskOfReviewerPage = () => {
  const [loading, setLoading] = useState(false);
  const [listCourses, setListCourses] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  const [totalCourses, setTotalCourses] = useState(0);
  const [statusFilter, setStatusFilter] = useState("ALL");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await coursesApi.getListTaskOfReviewer(statusFilter);
      if (res.errorCode == "") {
        setListCourses(res.data);
        setTotalCourses(res.data.length);
      }
      setLoading(false);
    };
    fetchData();
  }, [paginate, statusFilter]);

  const handleEdit = (row) => {
    nav(`/taskofreviewer/${row.id}`);
  };

  const columns = [
    {
      name: "Action",
      center: true,
      width: "100px",
      cell: (row) => (
        <Dropdown>
          <MenuItem onClick={() => handleEdit(row)}>
            <AiFillEye />
            Xem
          </MenuItem>
          {/* <MenuItem onClick={() => handleDelete(row)}>
            <AiFillDelete />
            Xóa
          </MenuItem>
          <MenuItem>
            <BiHistory />
            Lịch sử
          </MenuItem> */}
        </Dropdown>
      ),
    },
    {
      name: "Trạng thái",
      width: "150px",
      selector: (row) => {
        return (
          <span
            className={`badge ${
              row.status === Enums.STATUS_REGISTER_COURSE._APPROVED
                ? "bg-success"
                : row.status === Enums.STATUS_REGISTER_COURSE._NEED_EDIT
                ? "bg-warning"
                : row.status === Enums.STATUS_REGISTER_COURSE._REJECTED
                ? "bg-danger"
                : "bg-info"
            }`}
          >
            {Enums.STATUS_REGISTER_COURSE[row?.status]}
          </span>
        );
      },
      sortable: true,
      reorder: true,
    },
    {
      name: "Mã yêu cầu",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Tên khóa học",
      selector: (row) => row?.summaryInfo?.name,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
      wrap: true,
    },
    {
      name: "Loại khóa học",
      selector: (row) => row?.summaryInfo?.category?.name,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
      wrap: true,
    },
    {
      name: "Người tạo khóa học",
      selector: (row) => row?.registerUser?.fullname,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
    },

    {
      name: "Pulic",
      selector: (row) => {
        if (row.public === true) {
          return "Miễn phí";
        }
        return "Có phí";
      },
      sortable: true,
      reorder: true,
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      name: "Ngày gửi",
      selector: (row) => formatDateDisplay(row.createDate),
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
  ];

  const nav = useNavigate();

  return (
    <div className="container-fluid">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">
          Danh sách khóa học chưa được duyệt
        </h3>
        <div className="content__tool"></div>
      </div>
      <div className="d-flex align-items-center mb-3">
        <label
          htmlFor="statusFilter"
          className="form-label"
          style={{
            width: "200px",
            fontSize: "1rem",
          }}
        >
          Lọc theo trạng thái
        </label>
        <select
          class="form-select"
          defaultValue={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
          }}
          style={{
            width: "200px",
          }}
        >
          <option value="ALL">Tất cả</option>
          <option value="APPROVED ">Đã duyệt</option>
          <option value="NEED_EDIT">Cần chỉnh sửa</option>
          <option value="REJECTED ">Từ chối</option>
          <option value="WAITING_FOR_REVIEW ">Đang chờ duyệt</option>
        </select>
      </div>

      <div className="container__table">
        <CustomDataTable
          onRowDoubleClicked={(row) => handleEdit(row)}
          columns={columns}
          data={listCourses}
          paginate={paginate}
          setPaginate={setPaginate}
          count={totalCourses}
          loading={loading}
          selectableRows={false}
        />
      </div>
    </div>
  );
};

export default TaskOfReviewerPage;
