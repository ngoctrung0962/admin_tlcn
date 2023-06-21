import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import coursesApi from "../../../api/coursesApi";
import TabInformation from "../components/FormReviewCourse/TabInformation";
import TabContent from "../components/FormReviewCourse/TabContent";
import { MdOutlineAdd } from "react-icons/md";
import TabTeacherInfo from "../components/FormReviewCourse/TabTeacherInfo";
import Loading from "../../../components/Loading/Loading.component";
import Swal from "sweetalert2";
import { Enums } from "../../../utils/Enums";
export default function TaskOfReviewerEdit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [dataCourse, setDataCourse] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    const res = await coursesApi.reviewerGetCourseDetail(id);
    if (res.errorCode == "") {
      setDataCourse(res.data);
      setLoading(false);
    }
    setLoading(false);
  };
  const nav = useNavigate();
  const hanleApprove = async () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn duyệt khóa học này?",
      showCancelButton: true,
      confirmButtonText: `OK`,
      cancelButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await coursesApi.reviewerApproveCourse({
            sessionId: id,
            result: "APPROVED",
            reason: null,
          });
          if (res.errorCode === "") {
            Swal.fire({
              icon: "success",
              title: "Duyệt thành công",
              showConfirmButton: false,
              timer: 1500,
            });
            nav("/reviewcourses");
          } else {
            Swal.fire({
              icon: "error",
              title: "Duyệt thất bại",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Duyệt thất bại",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const handleReject = () => {
    Swal.fire({
      title: "Xác nhận từ chối",
      text: "Bạn có chắc muốn từ chối khóa học này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        // Nếu người dùng nhấn OK, hiển thị form điền lý do
        Swal.fire({
          title: "Nhập lý do từ chối",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Hủy",
          showLoaderOnConfirm: true,
          preConfirm: async (reason) => {
            console.log("reason", reason);
            // Gửi dữ liệu lên server
            // Ví dụ:
            const res = await coursesApi.reviewerApproveCourse({
              sessionId: id,
              result: "REJECTED",
              reason: reason,
            });
            if (res.errorCode === "") {
              Swal.fire({
                icon: "success",
                title: "Từ chối thành công",
                showConfirmButton: false,
                timer: 1500,
              });
              nav("/reviewcourses");
            } else {
              Swal.fire({
                icon: "error",
                title: "Từ chối thất bại",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      }
    });
  };

  const handleNeedEdit = () => {
    Swal.fire({
      title: "Xác nhận cần chỉnh sửa",
      text: "Bạn có chắc muốn yêu cầu chỉnh sửa khóa học này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        // Nếu người dùng nhấn OK, hiển thị form điền lý do
        Swal.fire({
          title: "Nhập lý do cần chỉnh sửa",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Hủy",
          showLoaderOnConfirm: true,
          preConfirm: async (reason) => {
            console.log("reason", reason);
            // Gửi dữ liệu lên server
            // Ví dụ:
            const res = await coursesApi.reviewerApproveCourse({
              sessionId: id,
              result: "NEED_EDIT",
              reason: reason,
            });
            if (res.errorCode === "") {
              Swal.fire({
                icon: "success",
                title: "Từ chối thành công",
                showConfirmButton: false,
                timer: 1500,
              });
              nav("/reviewcourses");
            } else {
              Swal.fire({
                icon: "error",
                title: "Từ chối thất bại",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  console.log(Enums.STATUS_REGISTER_COURSE.NEED_EDIT);
  return (
    <div className="containerr mx-3">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">Review khóa học</h3>

        {dataCourse?.status ===
          Enums.STATUS_REGISTER_COURSE._WAITING_FOR_REVIEW && (
          <div className="content__tool">
            <button className="main__btn me-3" onClick={() => hanleApprove()}>
              Duyệt
            </button>
            <button className="main__btn me-3" onClick={() => handleNeedEdit()}>
              Cần chỉnh sửa
            </button>
            <button className="main__btn" onClick={() => handleReject()}>
              Từ chối
            </button>
          </div>
        )}
      </div>
      <div>
        {!loading && (
          <>
            <span
              className={`badge mb-2 ${
                dataCourse?.status === "APPROVED"
                  ? "bg-success"
                  : dataCourse?.status === "NEED_EDIT"
                  ? "bg-warning"
                  : dataCourse?.status === "REJECTED"
                  ? "bg-danger"
                  : "bg-info"
              }`}
            >
              {Enums.STATUS_REGISTER_COURSE[dataCourse?.status]}
            </span>
            {(dataCourse?.status == Enums.STATUS_REGISTER_COURSE._NEED_EDIT ||
              dataCourse?.status == Enums.STATUS_REGISTER_COURSE._REJECTED) && (
              <div
                style={{
                  fontSize: "13px",
                  marginBottom: "10px",
                  borderLeft: "3px solid #dc3545",
                  paddingLeft: "10px",
                  boxShadow: "0 0 3px #dc3545",
                  width: "fit-content",
                  color: "#000",
                  fontWeight: "500",
                  padding: "5px",
                  borderBottomRightRadius: "5px",
                  borderTopRightRadius: "5px",
                }}
              >
                Lý do{" "}
                <span
                  style={{
                    textTransform: "lowercase",
                  }}
                >
                  {Enums.STATUS_REGISTER_COURSE[dataCourse?.status]}:{" "}
                </span>
                {dataCourse?.reason}
              </div>
            )}
          </>
        )}
      </div>
      <div className="">
        {!loading ? (
          <Tabs defaultActiveKey="infomation">
            <Tab eventKey="infomation" title="Thông tin khóa học">
              <TabInformation
                summaryInfo={dataCourse && dataCourse?.summaryInfo}
              />
            </Tab>
            <Tab eventKey="content" title="Nội dung khóa học">
              <TabContent content={dataCourse && dataCourse?.content} />
            </Tab>
            <Tab eventKey="teacherinfo" title="Thông tin giảng viên đăng ký">
              <TabTeacherInfo
                registerUser={dataCourse && dataCourse?.registerUser}
              />
            </Tab>
          </Tabs>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
