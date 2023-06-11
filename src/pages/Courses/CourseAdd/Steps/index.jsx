import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useState } from "react";

export default function Steps() {
  const [currentStep, setCurrentStep] = useState(1);
  const listSteps = [
    {
      id: 1,
      name: "Thông tin chính",
      component: (
        <Step1 currentStep={currentStep} setCurrentStep={setCurrentStep} />
      ),
    },
    {
      id: 2,
      name: "Nội dung khóa học",
      component: (
        <Step2 currentStep={currentStep} setCurrentStep={setCurrentStep} />
      ),
    },
    {
      id: 3,
      name: "Step 3",
      component: (
        <Step3 currentStep={currentStep} setCurrentStep={setCurrentStep} />
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
