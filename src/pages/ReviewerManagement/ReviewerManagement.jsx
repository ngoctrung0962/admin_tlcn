import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import reviewerApi from "../../api/reviewerApi";
import CustomDataTable from "../../components/CustomDataTable/CustomDataTable.component";
import Dropdown from "../../components/Dropdown/Dropdown.component";
import { formatDateDisplay } from "../../utils/MyUtils";

const ReviewerManagement = () => {
  const [loading, setLoading] = useState(false);
  const [listReviewers, setListReviewers] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  const [totalReviewer, setTotalReviewer] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await reviewerApi.getListReviewers(paginate.page);
      console.log(res);
      setListReviewers(res.data.content);
      setTotalReviewer(res.data.totalElements);
      setLoading(false);
    };
    fetchData();
  }, [paginate]);
  const nav = useNavigate();
  const handleEdit = (row) => {
    nav(`${row.id}`);
  };
  const columns = [
    // {
    //   name: "Action",
    //   minWidth: "100px",
    //   maxWidth: "100px",
    //   center: true,
    //   cell: (row) => (
    //     <Dropdown>
    //       {/* <MenuItem onClick={() => handleEdit(row)}>
    //         <AiFillEye />
    //         Xem
    //       </MenuItem> */}
    //       {/* <MenuItem>
    //         <AiFillDelete />
    //         Xóa
    //       </MenuItem> */}
    //     </Dropdown>
    //   ),
    // },

    {
      name: "Username",
      selector: (row) => row?.username,
      sortable: true,
      reorder: true,
    },
    {
      name: "Họ và tên",
      selector: (row) => row?.fullname,
      sortable: true,
      reorder: true,
    },
    {
      name: "Ngày sinh",
      selector: (row) => formatDateDisplay(row?.birthdate),
      sortable: true,
      reorder: true,
    },
    {
      name: "Giới tính",
      selector: (row) => row?.gender,
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      name: "Email",
      selector: (row) => row?.email,
      sortable: true,
      reorder: true,
    },
    {
      name: "Số điện thoại",
      selector: (row) => row?.phone,
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title ">Tất cả người kiểm duyệt</h3>
        <div className="content__tool">
          <button className="main__btn" onClick={() => nav("add")}>
            Thêm mới <MdOutlineAdd size={15} color="#00693e" />
          </button>
        </div>
      </div>
      <div className="container__table">
        {columns && (
          <CustomDataTable
            columns={columns}
            data={listReviewers}
            paginate={paginate}
            setPaginate={setPaginate}
            count={totalReviewer}
            loading={loading}
            selectableRows={false}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewerManagement;
