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
import { formatDateDisplay, formatVND } from "../../utils/MyUtils";
import Swal from "sweetalert2";
const ReviewCoursesPage = () => {
  const [loading, setLoading] = useState(false);
  const [listCourses, setListCourses] = useState([]);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  const [totalCourses, setTotalCourses] = useState(0);
  const fetchData = async () => {
    setLoading(true);
    const res = await coursesApi.getListCourseNotHaveReviewer();
    setListCourses(res.data);
    setTotalCourses(res.data.length);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [paginate]);

  const handleEdit = (row) => {
    nav(`/reviewcourses/${row.id}`);
  };

  const hanleAssignToMe = async (row) => {
    try {
      const res = await coursesApi.assingTaskToReviewer(row.id);
      if (res.errorCode == "") {
        Swal.fire({
          icon: "success",
          iconHtml: "👍",
          title: "Nhận nhiệm vụ thành công",
          text: "Bạn đã nhận nhiệm vụ thành công",
        });
        fetchData();
      } else {
        Swal.fire({
          icon: "error",
          iconHtml: "👎",
          title: "Nhận nhiệm vụ thất bại",
          text: "Bạn đã nhận nhiệm vụ thất bại",
        });
      }
    } catch (error) {}
  };
  const columns = [
    {
      name: "Action",
      center: true,
      width: "250px",
      cell: (row) => (
        // <Dropdown>
        //   <MenuItem onClick={() => handleEdit(row)}>
        //     <AiFillEye />
        //     Xem
        //   </MenuItem>
        //   {/* <MenuItem onClick={() => handleDelete(row)}>
        //     <AiFillDelete />
        //     Xóa
        //   </MenuItem>
        //   <MenuItem>
        //     <BiHistory />
        //     Lịch sử
        //   </MenuItem> */}
        // </Dropdown>
        <div>
          <button
            className="btn__action"
            onClick={() => handleEdit(row)}
            style={{ marginRight: "10px" }}
          >
            Xem
          </button>
          <button
            className="btn__action"
            onClick={() => hanleAssignToMe(row)}
            style={{ marginRight: "10px" }}
          >
            Nhận nhiệm vụ
          </button>
        </div>
      ),
    },
    {
      name: "Mã yêu cầu",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      name: "Tên khóa học",
      selector: (row) => row?.summaryInfo?.name,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
      wrap: true,
    },
    {
      name: "Loại khóa học",
      selector: (row) => row?.summaryInfo?.category?.name,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
      wrap: true,
    },
    {
      name: "Người tạo khóa học",
      selector: (row) => row?.registerUser?.fullname,
      sortable: true,
      reorder: true,
      minWidth: "200px",
      maxWidth: "200px",
    },

    {
      name: "Pulic",
      selector: (row) => {
        if (row.public === true) {
          return "Miễn phí";
        }
        return "Có phí";
      },
      sortable: true,
      reorder: true,
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      name: "Ngày gửi",
      selector: (row) => formatDateDisplay(row.createDate),
      sortable: true,
      reorder: true,
      minWidth: "150px",
      maxWidth: "150px",
    },
  ];

  const nav = useNavigate();
  return (
    <div className="container-fluid">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">Tất cả khóa học chưa được duyệt</h3>
        <div className="content__tool"></div>
      </div>
      <div className="container__table">
        <CustomDataTable
          onRowDoubleClicked={(row) => handleEdit(row)}
          columns={columns}
          data={listCourses}
          paginate={paginate}
          setPaginate={setPaginate}
          count={totalCourses}
          loading={loading}
          selectableRows={false}
        />
      </div>
    </div>
  );
};

export default ReviewCoursesPage;
