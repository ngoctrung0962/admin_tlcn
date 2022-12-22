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
import ModalVideo from "./ModalVideo";
import chapterApi from "../../../../api/chapterApi";
import Swal from "sweetalert2";
export default function TabsVideoCourseList({ course, getValues }) {
  const [listVideoOfCourses, setListVideoOfCourses] = useState([]);
  const [listchapters, setListchapters] = useState([]);
  const getListChapter = async () => {
    const res = await chapterApi.getbycourseId(courseId);
    setListchapters(res.data);
  };
  const [editRow, setEditRow] = useState();

  const [paginate, setPaginate] = useState({
    page: 0,
  });
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (row) => {
    setEditRow(row);
    setShowModal(true);
  };
  const [totalCourses, setTotalCourses] = useState(0);
  const courseId = useLocation().pathname.split("/")[2];
  useEffect(() => {
    const fetchData = async () => {
      const res = await videocoursesApi.getbycourseId(courseId);
      setListVideoOfCourses(res.data);
    };
    fetchData();
    getListChapter();
  }, [courseId, editRow]);

  const nav = useNavigate();
  const handleDelete = async (row) => {
    const res = await videocoursesApi.remove(row.id);
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Xóa thành công",
        showConfirmButton: false,
      });
      const res = await videocoursesApi.getbycourseId(courseId);
      setListVideoOfCourses(res.data);
    } else {
      Swal.fire({
        icon: "error",
        title: "Xóa thất bại",
        showConfirmButton: false,
      });
    }
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
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      name: "Chapter",
      selector: (row) => row.chapterId,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
      wrap: true,
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
      {showModal && (
        <ModalVideo
          show={showModal}
          onHide={() => setShowModal(false)}
          editRow={editRow}
          setEditRow={setEditRow}
          listchapters={listchapters}
          listVideos={listVideoOfCourses}
        />
      )}
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">Tất cả video</h3>
        <div className="content__tool">
          <button
            className="main__btn"
            onClick={() => {
              setEditRow(null);
              setShowModal(true);
            }}
          >
            Thêm mới <MdOutlineAdd size={15} color="#00693e" />
          </button>
        </div>
      </div>
      <div className="container">
        <CustomDataTable
          onRowDoubleClicked={(row) => handleEdit(row)}
          columns={columns}
          data={listVideoOfCourses.sort((a, b) =>
            a.nextVideoId > b.nextVideoId ? -1 : 1
          )}
          paginate={paginate}
          setPaginate={setPaginate}
          count={totalCourses}
        />
      </div>
    </div>
  );
}
