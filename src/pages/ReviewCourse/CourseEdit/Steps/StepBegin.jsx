import React from "react";
import { useState } from "react";
import coursesApi from "../../../../api/coursesApi";
import Swal from "sweetalert2";

export default function StepBegin({
  currentStep,
  setCurrentStep,
  dataCourseTemp,
  setDataCourseTemp,
}) {
  const [loading, setLoading] = useState(false);
  const handleStartCreateCourse = async () => {
    setLoading(true);
    try {
      const res = await coursesApi.initSection();
      if (res.errorCode === "") {
        setDataCourseTemp(res.data);
        setCurrentStep(currentStep + 1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: res.message,
        });
      }
    } catch (error) {}
    setLoading(false);
  };
  return (
    <div className="step__begin">
      <h3 className="step__begin-title mb-3">
        Tạo mới khóa học và chờ xét duyệt từ phía ban kiểm duyệt
      </h3>
      <button
        className="main__btn"
        onClick={() => handleStartCreateCourse()}
        disabled={loading}
      >
        <h5 className="m-0 p-0">Bắt đầu tạo khóa học</h5>
      </button>
    </div>
  );
}
