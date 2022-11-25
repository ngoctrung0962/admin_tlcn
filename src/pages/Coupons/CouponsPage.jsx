import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import CustomDataTable from "../../components/CustomDataTable/CustomDataTable.component";
import Dropdown from "../../components/Dropdown/Dropdown.component";
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import categoriescoursesApi from "../../api/categoriescoursesApi";
import Swal from "sweetalert2";
import { formatDateDisplay } from "../../utils/MyUtils";
import couponsApi from "../../api/couponsApi";

const CouponPage = () => {
  const [listCoupons, setlistCoupons] = useState([]);
  const [totalCoupons, settotalCoupons] = useState(0);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  useEffect(() => {
    fetchData();
  }, [paginate]);

  const fetchData = async () => {
    const res = await couponsApi.getAll(paginate.page);
    setlistCoupons(res.data.content);
    settotalCoupons(res.data?.totalElements);
  };

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
      const res = await couponsApi.delete(row.code);
      if (res.errorCode === "") {
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
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
      reorder: true,
    },
    {
      name: "Tên Coupon",
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
    {
      name: "Loại",
      selector: (row) => row.type,
      sortable: true,
      reorder: true,
    },
    {
      name: "Giá trị",
      selector: (row) => row.value,
      sortable: true,
      reorder: true,
    },
    {
      name: "Tổng Số lượng",
      selector: (row) => row.num,
      sortable: true,
      reorder: true,
    },
    {
      name: "Số lượng còn lại",
      selector: (row) => row.numberOfRemain,
      sortable: true,
      reorder: true,
    },
    {
      name: "Ngày bắt đầu",
      selector: (row) => formatDateDisplay(row.startDate),
      sortable: true,
      reorder: true,
    },
    {
      name: "Ngày kết thúc",
      selector: (row) => formatDateDisplay(row.expiredDate),
      sortable: true,
      reorder: true,
    },
    {
      name: "Ngày tạo",
      selector: (row) => formatDateDisplay(row.createDate),
      sortable: true,
      reorder: true,
    },
    {
      name: "Người tạo",
      selector: (row) => row.user_created,
      sortable: true,
      reorder: true,
    },
    {
      name: "Mô tả",
      selector: (row) => row.description,
      sortable: true,
      reorder: true,
    },
  ];
  const handleDeleteRowSelected = async (list) => {
    await Promise.all(
      list.map(async (row, index) => {
        try {
          const res = await couponsApi.delete(row.code);
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
      })
    );

    // for (let index = 0; index < list.length; index++) {
    //   try {
    //     const res = await couponsApi.delete(list[index].code);
    //     if (index === list.length - 1) {
    //       if (res.errorCode === "") {
    //         Swal.fire({
    //           icon: "success",
    //           title: "Xóa thành công",
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });
    //       } else {
    //         Swal.fire({
    //           icon: "error",
    //           title: "Xóa thất bại",
    //           showConfirmButton: false,
    //           timer: 1500,
    //         });
    //       }
    //     }
    //   } catch (error) {}
    // }
    fetchData();
  };
  const nav = useNavigate();
  return (
    <div className="container-fluid">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">Tất cả coupons</h3>
        <div className="content__tool">
          <button className="main__btn" onClick={() => nav("/coupons/add")}>
            Thêm mới <MdOutlineAdd size={15} color="#005fb7" />
          </button>
        </div>
      </div>
      <div className="container">
        <CustomDataTable
          columns={columns}
          data={listCoupons}
          paginate={paginate}
          setPaginate={setPaginate}
          count={totalCoupons}
          handleDeleteRowSelected={handleDeleteRowSelected}
        />
      </div>
    </div>
  );
};

export default CouponPage;
