import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { MdOutlineAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import chapterApi from "../../../../api/chapterApi";
import CustomDataTable from "../../../../components/CustomDataTable/CustomDataTable.component";
import Dropdown from "../../../../components/Dropdown/Dropdown.component";
import ModalChapter from "./ModalChapter";
export default function TabsChapterList({ course, getValues }) {
  const [listChapters, setListChapters] = useState([]);
  const [editRow, setEditRow] = useState();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await chapterApi.getbycourseId(id);
      setListChapters(res.data);
    };
    fetchData();
  }, [id, editRow]);

  const handleEdit = (row) => {
    setEditRow(row);
    setShowModal(true);
  };
  const nav = useNavigate();
  const handleDelete = async (row) => {
    const res = await chapterApi.remove(id, row.id);
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Xóa thành công",
        showConfirmButton: false,
      });
      const res = await chapterApi.getbycourseId(id);
      setListChapters(res.data);
    } else {
      Swal.fire({
        icon: "error",
        title: "Xóa thất bại",
        showConfirmButton: false,
      });
    }
  };
  const handleDeleteRowSelected = async (list) => {};
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
      name: "Chapter Name",
      selector: (row) => row.chapterName,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
      wrap: true,
    },

    {
      name: "Số lượng video",
      selector: (row) => row.numVideos,
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      name: "ID chapter kế tiếp",
      selector: (row) => row.nextChapterId,
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
  ];
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container-fluid">
      {showModal && (
        <ModalChapter
          show={showModal}
          onHide={() => setShowModal(false)}
          editRow={editRow}
          setEditRow={setEditRow}
          listchapters={listChapters}
        />
      )}
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">Tất cả chapter</h3>
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
      <div className="container__table">
        <CustomDataTable
          onRowDoubleClicked={(row) => handleEdit(row)}
          columns={columns}
          data={listChapters}
        />
      </div>
    </div>
  );
}
