import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import reviewApi from "../../api/reviewApi";
import CustomDataTable from "../../components/CustomDataTable/CustomDataTable.component";
import Dropdown from "../../components/Dropdown/Dropdown.component";
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import coursesApi from "../../api/coursesApi";
import { useNavigate } from "react-router-dom";
import { formatDateDisplay, formatVND } from "../../utils/MyUtils";
import Swal from "sweetalert2";
import { Enums } from "../../utils/Enums";
const MyCoursesPage = () => {
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [listCourses, setListCourses] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  const [totalCourses, setTotalCourses] = useState(0);
  const fetchData = async () => {
    setLoading(true);
    const res = await coursesApi.getListCourseRegisterByStatus(statusFilter);
    setListCourses(res.data);
    setTotalCourses(res.data.length);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [paginate, statusFilter]);

  const handleEdit = (row) => {
    nav(`/mycourses/${row.id}`);
  };

  const handleDelete = async (row) => {
    try {
      const resDelete = await coursesApi.remove(row.id);
      if (resDelete.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Xóa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        const res = await coursesApi.getAll(paginate.page);
        setListCourses(res.data.content);
        setTotalCourses(res.data.totalElements);
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
      minWidth: "100px",
      maxWidth: "100px",
      center: true,
      cell: (row) => (
        <Dropdown>
          <MenuItem onClick={() => handleEdit(row)}>
            <AiFillEye />
            Xem
          </MenuItem>
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
      name: "Ngày tạo",
      selector: (row) => formatDateDisplay(row.createDate),
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      name: "Ngày cập nhật",
      selector: (row) => formatDateDisplay(row.updateDate),
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
        <h3 className="content__title mb-3">Tất cả bảng đăng ký khóa học</h3>
        <div className="content__tool">
          <button className="main__btn" onClick={() => nav("/mycourses/add")}>
            Thêm mới <MdOutlineAdd size={15} color="#00693e" />
          </button>
        </div>
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
          <option value="DRAFT">Bản phát thảo</option>
          <option value="SUBMITTED">Đã nộp</option>
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

export default MyCoursesPage;
