import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useState } from "react";
import StepBegin from "./StepBegin";

export default function Steps({ dataEdit }) {
  console.log("dataEdit1", dataEdit);
  const stepMaping = {
    REGISTER_SUMMARY_INFO: 1,
    REGISTER_CONTENT: 2,
    REVIEW_ALL: 3,
  };
  const [currentStep, setCurrentStep] = useState(
    dataEdit && stepMaping[dataEdit.currentStep]
  );
  const [dataCourseTemp, setDataCourseTemp] = useState(dataEdit && dataEdit);
  console.log("dataCourseTemp", dataCourseTemp);
  const listSteps = [
    {
      id: 0,
      name: "Bắt đầu",
      component: (
        <StepBegin
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          dataCourseTemp={dataCourseTemp}
          setDataCourseTemp={setDataCourseTemp}
        />
      ),
    },
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
