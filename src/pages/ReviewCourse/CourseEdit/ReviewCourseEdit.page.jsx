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
export default function ReviewCourseEdit() {
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

  const hanleAssignToMe = async () => {
    try {
      const res = await coursesApi.assingTaskToReviewer(id);
      if (res.errorCode == "") {
        Swal.fire({
          icon: "success",
          iconHtml: "👍",
          title: "Nhận nhiệm vụ thành công",
          text: "Bạn đã nhận nhiệm vụ thành công",
        });
        nav("/reviewcourses");
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

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="containerr mx-3">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">Review khóa học</h3>
        <div className="content__tool">
          <button className="main__btn me-3" onClick={() => hanleAssignToMe()}>
            Nhận nhiệm vụ
          </button>
        </div>
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
