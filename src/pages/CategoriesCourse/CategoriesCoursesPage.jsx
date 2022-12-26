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
import categoriescoursesApi from "../../api/categoriescoursesApi";
import Swal from "sweetalert2";

const CategoriesCoursesPage = () => {
  const [listCategoriesCourses, setListCategoriesCourses] = useState([]);
  const [totalCategoriesCourses, setTotalCategoriesCourses] = useState(0);
  const [paginate, setPaginate] = useState({
    page: 0,
  });

  const fetchData = async () => {
    const res = await categoriescoursesApi.getAll(paginate.page);
    setListCategoriesCourses(res.data.content);
    setTotalCategoriesCourses(res.data.totalElements);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await categoriescoursesApi.getAll(paginate.page);
      setListCategoriesCourses(res.data.content);
      setTotalCategoriesCourses(res.data.totalElements);
    };
    fetchData();
  }, [paginate]);

  //Navigate to edit page
  const handleEdit = (row) => {
    nav("edit", {
      state: {
        data: row,
      },
    });
  };

  const handleDelete = async (row) => {
    try {
      const res = await categoriescoursesApi.remove(row.id);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Xóa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        // const newList = listCategoriesCourses.filter(
        //   (item) => item.id !== row.id
        // );
        // setListCategoriesCourses(newList);
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
      width: "100px",
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
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Tên loại khóa học",
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
  ];
  const handleDeleteRowSelected = (list) => {
    list.forEach(async (item, index) => {
      try {
        const res = await categoriescoursesApi.remove(item.id);
        if (index === list.length - 1) {
          if (res.errorCode === "") {
            Swal.fire({
              icon: "success",
              title: "Xóa thành công",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Xóa thất bại",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      } catch (error) {}
    });
    const newList = listCategoriesCourses.filter(
      (item) => !list.find((row) => row.id === item.id)
    );
    setListCategoriesCourses(newList);
  };
  const nav = useNavigate();
  return (
    <div className="container-fluid">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">Tất cả loại khóa học</h3>
        <div className="content__tool">
          <button className="main__btn" onClick={() => nav("/categories/add")}>
            Thêm mới <MdOutlineAdd size={15} color="#00693e" />
          </button>
        </div>
      </div>
      <div className="container">
        <CustomDataTable
          columns={columns}
          data={listCategoriesCourses}
          paginate={paginate}
          setPaginate={setPaginate}
          count={totalCategoriesCourses}
          handleDeleteRowSelected={handleDeleteRowSelected}
        />
      </div>
    </div>
  );
};

export default CategoriesCoursesPage;
