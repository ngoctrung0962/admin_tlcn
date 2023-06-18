import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import coursesApi from "../../../api/coursesApi";
import TabInformation from "../components/FormReviewCourse/TabInformation";
import TabContent from "../components/FormReviewCourse/TabContent";
import { MdOutlineAdd } from "react-icons/md";
export default function ReviewCourseEdit({ isEdit }) {
  const dataCourseTemp = {
    summaryInfo: {
      id: 9,
      category: {
        id: "C04",
        name: "Language",
        active: true,
      },
      language: "Vietnamese",
      name: "KH3",
      description: "<p>setting chơi game mượt nhất cho laptop msi<br></p>",
      avatar:
        "https://onlinecourse-lectures.s3.ap-southeast-1.amazonaws.com/9c450b52-97d7-403d-aae3-02a21f93edea-slider-img.png",
      isPublic: null,
      price: 0.0,
      sessionId: "560cbc41-10c2-40d8-8aca-a96f7f8462fa",
    },
    content: [
      {
        id: 33,
        courseId: null,
        chapterName: "Chapter 1",
        numVideos: 3,
        headChapter: false,
        nextChapterId: 0,
        offset: 0,
        lectures: [
          {
            createDate: "2023-06-17T17:52:22.613+00:00",
            updateDate: "2023-06-17T17:52:22.613+00:00",
            owner: "toanpt",
            offset: 0,
            lectureType: "VIDEO",
            id: 233,
            blocked: false,
            chapterId: 33,
            title: "Lecture 1",
            description:
              "lorem ipsum dolor sit amet consectetur adipisicing elit ",
            link: "https://toannpt-onlinecourses.s3.amazonaws.com/toanpt-COU013-18-IAM%20Users%20%26%20Groups%20Tutorial",
          },
          {
            createDate: "2023-06-17T17:52:22.613+00:00",
            updateDate: "2023-06-17T17:52:22.613+00:00",
            owner: "toanpt",
            offset: 1,
            lectureType: "PRESENTATION",
            id: 234,
            chapterId: 33,
            link: null,
            title: "Lecture 2",
            blocked: false,
            description:
              "lorem ipsum dolor sit amet consectetur adipisicing elit ",
            content:
              "<p          style={{ textAlign: 'center', color:'red' }}          >lorem ipsum dolor sit amet consectetur adipisicing elit </p>",
            type: "TEXT",
          },
          {
            createDate: "2023-06-17T17:52:22.613+00:00",
            updateDate: "2023-06-17T17:52:22.613+00:00",
            owner: "toanpt",
            offset: 2,
            lectureType: "PRESENTATION",
            id: 235,
            chapterId: 33,
            link: "https://api.wlin.com.vn/getfile/templates/62e0bfc85271e2560e8bcc33_1664242366096_FT.BBDT01_BB_DAO_TAO_WLIN_220720.pdf?access_token=a094726249b98dc442a1d8680fa4351d",
            title: "Lecture 2",
            blocked: false,
            description:
              "lorem ipsum dolor sit amet consectetur adipisicing elit ",
            content: null,
            type: "FILE",
          },
        ],
      },
    ],
  };
  return (
    <div className="containerr mx-3">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">
          {isEdit ? "Sửa khóa học" : "Thêm khóa học"}
        </h3>
        <div className="content__tool">
          <button className="main__btn me-3">Duyệt</button>
          <button className="main__btn">Từ chối</button>
        </div>
      </div>
      <div className="">
        <Tabs defaultActiveKey="infomation" id="uncontrolled-tab-example">
          <Tab eventKey="infomation" title="Thông tin khóa học">
            <TabInformation summaryInfo={dataCourseTemp?.summaryInfo} />
          </Tab>
          <Tab eventKey="content" title="Nội dung khóa học">
            <TabContent content={dataCourseTemp?.content} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
