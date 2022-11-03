import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import reviewApi from "../../api/reviewApi";
import CustomDataTable from "../../components/CustomDataTable/CustomDataTable.component";
import Dropdown from "../../components/Dropdown/Dropdown.component";
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";

const ReviewPage = () => {
  const [listReviews, setListReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await reviewApi.getAll();
      console.log(res);
      setListReviews(res.data.content);
    };
    fetchData();
  }, []);
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
      name: "User name",
      selector: (row) => row.username,
      sortable: true,
      reorder: true,
    },

    {
      name: "Ngày tạo",
      selector: (row) => row.createDate,
      sortable: true,
      reorder: true,
    },
    {
      name: "Nội dung",
      selector: (row) => row.content,
      sortable: true,
      reorder: true,
    },
    {
      name: "Đánh giá",
      selector: (row) => row.rate,
      sortable: true,
      reorder: true,
    },
  ];
  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];
  console.log("listReviews", listReviews);
  return (
    <div className="container-fluid">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title ">Tất cả bình luận</h3>
        <div className="content__tool">
          <button className="main__btn">
            Thêm mới <MdOutlineAdd size={15} color="#005fb7" />
          </button>
        </div>
      </div>
      <div className="container">
        <CustomDataTable columns={columns} data={listReviews} />
      </div>
    </div>
  );
};

export default ReviewPage;
