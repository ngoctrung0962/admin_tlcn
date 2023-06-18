import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import TabInformation from "../../components/FormReviewCourse/TabInformation";
import TabContent from "../../components/FormReviewCourse/TabContent";
import coursesApi from "../../../../api/coursesApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function Step3({
  currentStep,
  setCurrentStep,
  dataCourseTemp,
  setDataCourseTemp,
}) {
  const nav = useNavigate();
  const handleSubmitRequest = async () => {
    try {
      const res = await coursesApi.submitRequest(dataCourseTemp?.id);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Gửi yêu cầu thành công! Vui lòng chờ duyệt",
          showConfirmButton: false,
          timer: 5000,
        });
        nav("/courses");
      } else {
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: res.message,
        });
        return;
      }
    } catch (error) {}
  };
  return (
    <div>
      <Tabs defaultActiveKey="infomation" id="uncontrolled-tab-example">
        <Tab eventKey="infomation" title="Thông tin khóa học">
          <TabInformation summaryInfo={dataCourseTemp?.summaryInfo} />
        </Tab>
        <Tab eventKey="content" title="Nội dung khóa học">
          <TabContent content={dataCourseTemp?.content} />
        </Tab>
      </Tabs>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          gap: "10px",
        }}
      >
        <button className="main__btn" onClick={() => handleSubmitRequest()}>
          Finish
        </button>
        <button
          className="main__btn"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Prev
        </button>
      </div>
    </div>
  );
}
