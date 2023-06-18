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
  console.log(dataCourseTemp);
  const dataSumary = {
    id: 4,
    category: {
      id: "C01",
      name: "Web Developer",
    },
    language: "English",
    name: "The though machine course cert practise",
    description:
      "learn more about many cert of TM (though machine), you will learn and practise axam to do",
    avatar:
      "https://onlinecourse-lectures.s3.ap-southeast-1.amazonaws.com/accf5157-a2d8-4140-9a6d-f3f749c7f6a0-Screenshot%20%2841%29.png",
    isPublic: true,
    price: 300000,
    activeWhenApproved: true,
    sessionId: "215ea1e6-05c2-4311-a404-9554c15ba629",
  };

  const content = [
    {
      id: 29,
      courseId: null,
      chapterName:
        "Introduction About TM Cert and What you will learn in course",
      numVideos: 0,
      headChapter: false,
      nextChapterId: 0,
      offset: 1,
      lectures: [
        {
          createDate: "2023-06-12T14:37:09.104+00:00",
          updateDate: "2023-06-12T14:37:09.104+00:00",
          owner: "toanpt",
          offset: 1,
          lectureType: "PRESENTATION",
          id: 216,
          chapterId: 30,
          link: null,
          title: "The abstract contract, very important for us to learn TM",
          blocked: false,
          description: "A bit announcement to my students",
          type: "FILE",
        },
      ],
    },
    {
      id: 30,
      courseId: null,
      chapterName: "Which is 4 Important of Feature TM? ",
      numVideos: 3,
      headChapter: false,
      nextChapterId: 0,
      offset: 2,
      lectures: [
        {
          createDate: "2023-06-12T14:37:09.104+00:00",
          updateDate: "2023-06-12T14:37:09.104+00:00",
          owner: "toanpt",
          offset: 1,
          lectureType: "PRESENTATION",
          id: 216,
          chapterId: 30,
          link: null,
          title: "The abstract contract, very important for us to learn TM",
          blocked: false,
          description: "A bit announcement to my students",
          content:
            "Hello, I wanna notice that the resouce placed in Resource TAB, in the section 2",
          type: "TEXT",
        },
        {
          createDate: "2023-06-12T14:37:09.104+00:00",
          updateDate: "2023-06-12T14:37:09.104+00:00",
          owner: "toanpt",
          offset: 2,
          lectureType: "VIDEO",
          id: 217,
          blocked: false,
          chapterId: 30,
          title: "The abstract contract, very important for us to learn TM",
          description:
            "This video will explain the first feature in TM, abstract contract. This is the main actor contribute to construct TM and you should learn it exaclly",
          link: "tam thoi chua set",
        },
        {
          createDate: "2023-06-12T14:37:09.104+00:00",
          updateDate: "2023-06-12T14:37:09.104+00:00",
          owner: "toanpt",
          offset: 3,
          lectureType: "QUIZ",
          id: 218,
          title: "Test Abstract Contract Feature",
          summary:
            "this quiz to test about important abstract contract feature before learning next features",
          blocked: false,
          chapterId: 30,
          numToPass: 3.0,
        },
      ],
    },
  ];
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
