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
import { useSelector } from "react-redux";
const CourseManagementPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log("currentUser", currentUser);
  const [loading, setLoading] = useState(false);
  const [listCourses, setListCourses] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
    limit: 10,
  });
  const [totalCourses, setTotalCourses] = useState(0);
  const fetchData = async () => {
    setLoading(true);
    if (currentUser?.role === Enums.ROLE.ADMIN) {
      const res = await coursesApi.adminGetListCourse(paginate);
      if (res.errorCode === "") {
        setListCourses(res.data.content);
        setTotalCourses(res.data.totalElements);
      }
    } else {
      const res = await coursesApi.getListCourseOfTeacher(paginate);
      if (res.errorCode === "") {
        setListCourses(res.data.content);
        setTotalCourses(res.data.totalElements);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [paginate]);

  const handleEdit = (row) => {
    nav(`/coursemanagement/${row.id}`);
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
      selector: (row) => {
        return (
          <p
            className="m-0"
            style={{
              color: row.active === true ? "green" : "red",
              fontWeight: "bold",
              backgroundColor: row.active === true ? "#d4edda" : "#f8d7da",
              borderRadius: "5px",
              padding: "5px",
              textAlign: "center",
              width: "100px",
            }}
          >
            {row.active === true ? "Đang bán" : "Ngừng bán"}
          </p>
        );
      },
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
    },
    {
      name: "Giảng viên",
      selector: (row) => row.accountName,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
    },
    {
      name: "Mã khóa học",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
    },
    {
      name: "Tên khóa học",
      selector: (row) => row?.name,
      sortable: true,
      reorder: true,
      minWidth: "400px",
      maxWidth: "400px",
      wrap: true,
    },
    {
      name: "Loại khóa học",
      selector: (row) => row?.category?.name,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
      wrap: true,
    },
    {
      name: "Số học viên",
      selector: (row) => row?.numStudents,
      sortable: true,
      reorder: true,
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
        <h3 className="content__title mb-3">Tất cả khóa học</h3>
        <div className="content__tool">
          <button className="main__btn" onClick={() => nav("/mycourses/add")}>
            Thêm mới <MdOutlineAdd size={15} color="#00693e" />
          </button>
        </div>
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

export default CourseManagementPage;
