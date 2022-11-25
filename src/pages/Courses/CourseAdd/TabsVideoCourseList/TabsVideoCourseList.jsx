import React, { useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import CustomDataTable from "../../../../components/CustomDataTable/CustomDataTable.component";
import { MenuItem } from "@mui/material";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { formatDateDisplay } from "../../../../utils/MyUtils";
import videocoursesApi from "../../../../api/videocoursesApi";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../../../../components/Dropdown/Dropdown.component";
export default function TabsVideoCourseList({ course, getValues }) {
  const [listVideoOfCourses, setListVideoOfCourses] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  const [totalCourses, setTotalCourses] = useState(0);
  const courseId = useLocation().pathname.split("/")[2];
  useEffect(() => {
    const fetchData = async () => {
      const res = await videocoursesApi.getbycourseId(courseId);
      setListVideoOfCourses(res.data);
    };
    fetchData();
  }, [courseId]);

  const handleEdit = (row) => {};
  const nav = useNavigate();
  const handleDelete = async (row) => {};
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
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      name: "Chapter",
      selector: (row) => row.chapter,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
      wrap: true,
    },
    {
      name: "Video",
      selector: (row) => {
        return (
          <div className="p-2 ">
            <video
              className="video-inTable"
              controls
              src={row.link}
              style={{}}
            ></video>
          </div>
        );
      },
      sortable: true,
      reorder: true,
      minWidth: "400px",
      maxWidth: "400px",
    },
    {
      name: "Tiêu đề",
      selector: (row) => row.title,
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
    {
      name: "Mô tả video",
      selector: (row) => row.description,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
      wrap: true,
    },
  ];
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
          onRowDoubleClicked={(row) => handleEdit(row)}
          columns={columns}
          data={listVideoOfCourses}
          paginate={paginate}
          setPaginate={setPaginate}
          count={totalCourses}
        />
      </div>
    </div>
  );
}
