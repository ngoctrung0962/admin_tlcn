import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import coursesApi from "../../../api/coursesApi";
import TabContent from "../components/FormReviewCourse/TabContent";
import { MdOutlineAdd } from "react-icons/md";
import Loading from "../../../components/Loading/Loading.component";
import Swal from "sweetalert2";

import TabInformation from "../components/FormReviewCourse/TabInformation";
export default function CourseManagementEdit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [summaryInfo, setSummaryInfo] = useState();

  const getSummaryInfo = async () => {
    setLoading(true);
    try {
      const res = await coursesApi.teacherGetCourseDetail(id);
      if (res.errorCode == "") {
        setSummaryInfo(res.data);
      }
    } catch (error) {}
    setLoading(false);
  };
  useEffect(() => {
    getSummaryInfo();
  }, []);

  const handleStopSell = async () => {
    try {
      const res = await coursesApi.teacherStopSellCourse(id);
      if (res.errorCode == null) {
        getSummaryInfo();
        Swal.fire({
          icon: "success",
          title: "Ngừng bán thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };

  const handleStartSell = async () => {
    try {
      const res = await coursesApi.teacherStartSellCourse(id);
      if (res.errorCode == null) {
        getSummaryInfo();
        Swal.fire({
          icon: "success",
          title: "Cho phép bán thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };
  return (
    <div className="containerr mx-3">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">Sửa khóa học</h3>
        <div className="content__tool">
          {summaryInfo?.active === false ? (
            <button
              className="main__btn me-3"
              disabled={loading}
              onClick={() => handleStartSell()}
            >
              Cho phép bán
            </button>
          ) : (
            <button
              disabled={loading}
              className="main__btn me-3"
              onClick={() => handleStopSell()}
            >
              Ngừng bán
            </button>
          )}
        </div>
      </div>
      <div className="">
        {!loading ? (
          <Tabs defaultActiveKey="infomation">
            <Tab eventKey="infomation" title="Thông tin khóa học">
              <TabInformation idCourse={id} />
            </Tab>
            <Tab eventKey="content" title="Nội dung khóa học">
              <TabContent idCourse={id} />
            </Tab>
          </Tabs>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
