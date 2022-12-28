import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import paymentApi from "../../api/paymentApi";
import CustomDataTable from "../../components/CustomDataTable/CustomDataTable.component";
import Dropdown from "../../components/Dropdown/Dropdown.component";

const PaymentMethodPage = () => {
  const [listPayments, setlistPayments] = useState([]);
  const [totalPayments, settotalPayments] = useState(0);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  useEffect(() => {
    fetchData();
  }, [paginate]);

  const fetchData = async () => {
    const res = await paymentApi.getAll(paginate.page);
    setlistPayments(res.data.content);
    settotalPayments(res.data?.totalElements);
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
      const res = await paymentApi.delete(row.id);
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
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Tên phương thức thanh toán",
      selector: (row) => row.name,
      sortable: true,
      reorder: true,
    },
  ];
  const handleDeleteRowSelected = async (list) => {
    await Promise.all(
      list.map(async (row, index) => {
        try {
          const res = await paymentApi.delete(row.id);
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
    //     const res = await paymentApi.delete(list[index].code);
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
        <h3 className="content__title mb-3">Tất cả phương thức thanh toán</h3>
        <div className="content__tool">
          <button className="main__btn" onClick={() => nav("/payments/add")}>
            Thêm mới <MdOutlineAdd size={15} color="#00693e" />
          </button>
        </div>
      </div>
      <div className="container__table">
        <CustomDataTable
          columns={columns}
          data={listPayments}
          paginate={paginate}
          setPaginate={setPaginate}
          count={totalPayments}
          handleDeleteRowSelected={handleDeleteRowSelected}
        />
      </div>
    </div>
  );
};

export default PaymentMethodPage;
