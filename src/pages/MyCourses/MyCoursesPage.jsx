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
const MyCoursesPage = () => {
  const [loading, setLoading] = useState(false);
  const [listCourses, setListCourses] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  const [totalCourses, setTotalCourses] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await coursesApi.getListCourseRegisterByStatus("DRAFT");
      setListCourses(res.data);
      setTotalCourses(res.data.length);
      setLoading(false);
    };
    fetchData();
  }, [paginate]);

  const handleEdit = (row) => {
    nav(`/mycourses/edit`, { state: row });
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
        />
      </div>
    </div>
  );
};

export default MyCoursesPage;
