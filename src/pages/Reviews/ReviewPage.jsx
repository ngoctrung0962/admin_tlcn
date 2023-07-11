import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import reviewApi from "../../api/reviewApi";
import CustomDataTable from "../../components/CustomDataTable/CustomDataTable.component";
import Dropdown from "../../components/Dropdown/Dropdown.component";
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { formatDateDisplay } from "../../utils/MyUtils";

const ReviewPage = () => {
  const [loading, setLoading] = useState(false);
  const [listReviews, setListReviews] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  const [totalReview, setTotalReview] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await reviewApi.getAll(paginate.page);
      console.log(res);
      setListReviews(res.data.content);
      setTotalReview(res.data.totalElements);
      setLoading(false);
    };
    fetchData();
  }, [paginate]);
  const nav = useNavigate();
  const handleEdit = (row) => {
    nav(`${row.id}`);
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
          {/* <MenuItem>
            <AiFillDelete />
            Xóa
          </MenuItem> */}
        </Dropdown>
      ),
    },
    {
      name: "reviewId",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      name: "User name",
      selector: (row) => row.username,
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
      minWidth: "200px",
      maxWidth: "200px",
    },
    {
      name: "Nội dung",
      selector: (row) => row.content,
      sortable: true,
      reorder: true,
      minWidth: "250px",
      maxWidth: "250px",
      wrap: true,
    },
    {
      name: "Đánh giá",
      selector: (row) => row.rate,
      sortable: true,
      reorder: true,
      minWidth: "100px",
      maxWidth: "100px",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title ">Tất cả bình luận</h3>
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
            data={listReviews}
            paginate={paginate}
            setPaginate={setPaginate}
            count={totalReview}
            loading={loading}
            selectableRows={false}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
