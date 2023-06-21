import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import coursesApi from "../../../api/coursesApi";
import Steps from "./Steps";
import { Enums } from "../../../utils/Enums";
import { formatDateDisplay } from "../../../utils/MyUtils";
export default function CourseEdit() {
  const [loading, setLoading] = useState(false);
  const courseId = useParams().id;
  console.log("courseId", courseId);
  const [course, setCourse] = useState();
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await coursesApi.reviewerGetCourseDetail(courseId);
      if (res.errorCode == "") {
        setCourse(res.data);
      }
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, [courseId]);

  return (
    <div className="containerr mx-3">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">Sửa khóa học</h3>
      </div>
      <div>
        {!loading && (
          <>
            <span
              className={`badge mb-2 ${
                course?.status === "APPROVED"
                  ? "bg-success"
                  : course?.status === "NEED_EDIT"
                  ? "bg-warning"
                  : course?.status === "REJECTED"
                  ? "bg-danger"
                  : "bg-info"
              }`}
            >
              {Enums.STATUS_REGISTER_COURSE[course?.status]}
            </span>
            {(course?.status == Enums.STATUS_REGISTER_COURSE._NEED_EDIT ||
              course?.status == Enums.STATUS_REGISTER_COURSE._REJECTED) && (
              <div>
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
                    {Enums.STATUS_REGISTER_COURSE[course?.status]}:{" "}
                  </span>
                  {course?.reason}
                </div>
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
                  Ngày{" "}
                  <span
                    style={{
                      textTransform: "lowercase",
                    }}
                  >
                    {Enums.STATUS_REGISTER_COURSE[course?.status]}:{"  "}
                  </span>{" "}
                  {formatDateDisplay(course?.updateStatusTime)}
                </div>
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
                  Người duyệt: {course?.reviewer?.fullname}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="">{course && <Steps dataEdit={course} />}</div>
    </div>
  );
}
