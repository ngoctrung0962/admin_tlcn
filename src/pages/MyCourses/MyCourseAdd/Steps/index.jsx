import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useState } from "react";

export default function Steps() {
  const [currentStep, setCurrentStep] = useState(1);
  const [dataCourseTemp, setDataCourseTemp] = useState();
  console.log("dataCourseTemp", dataCourseTemp);
  const listSteps = [
    {
      id: 1,
      name: "Thông tin chính",
      component: (
        <Step1
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          dataCourseTemp={dataCourseTemp}
          setDataCourseTemp={setDataCourseTemp}
        />
      ),
    },
    {
      id: 2,
      name: "Nội dung khóa học",
      component: (
        <Step2
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          dataCourseTemp={dataCourseTemp}
          setDataCourseTemp={setDataCourseTemp}
        />
      ),
    },
    {
      id: 3,
      name: "Review",
      component: (
        <Step3
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          dataCourseTemp={dataCourseTemp}
          setDataCourseTemp={setDataCourseTemp}
        />
      ),
    },
  ];
  return (
    <div>
      {listSteps.map((step) => {
        if (step.id === currentStep)
          return (
            <div key={step.id} className="step__content">
              <div className="step__title">
                <div className="step__id"> {step.id}</div>
                <h5>{step.name}</h5>
              </div>
              {step.component}
            </div>
          );
      })}
    </div>
  );
}
