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

const CoursesPage = () => {
  const [listCourses, setListCourses] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await coursesApi.getAll(paginate.page);
      console.log(res);
      setListCourses(res.data.content);
    };
    fetchData();
  }, [paginate]);
  console.log("listCourses", listCourses);
  const columns = [
    {
      name: "Action",
      stt: -10,
      width: "100px",
      center: true,
      cell: (row) => (
        <Dropdown>
          <MenuItem>
            <AiFillEye />
            Xem
          </MenuItem>
          <MenuItem>
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
      name: "reviewId",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Tên khóa học",
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
    {
      name: "Giá",
      selector: (row) => row.price,
      sortable: true,
      reorder: true,
    },
    {
      name: "Số học sinh tham gia",
      selector: (row) => row.numStudents,
      sortable: true,
      reorder: true,
    },
    {
      name: "Mô tả khóa học",
      selector: (row) => row.description,
      sortable: true,
      reorder: true,
    },
  ];

  const nav = useNavigate();
  return (
    <div className="container-fluid">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">Tất cả khóa học</h3>
        <div className="content__tool">
          <button className="main__btn" onClick={() => nav("/courses/add")}>
            Thêm mới <MdOutlineAdd size={15} color="#005fb7" />
          </button>
        </div>
      </div>
      <div className="container">
        <CustomDataTable
          columns={columns}
          data={listCourses}
          paginate={paginate}
          setPaginate={setPaginate}
          count={listCourses.length}
        />
      </div>
    </div>
  );
};

export default CoursesPage;
