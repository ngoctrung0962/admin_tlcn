import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { MdOutlineAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import TabsCourseInfo from "./TabsCourseInfo/TabsCourseInfo";
export default function CourseAdd() {
  const nav = useNavigate();
  return (
    <div className="container">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">THÊM MỚI KHÓA HỌC</h3>
        <div className="content__tool ">
          <button
            className="main__btn me-2"
            onClick={() => nav("/courses/add")}
          >
            Hủy
          </button>
          <button className="main__btn" onClick={() => nav("/courses/add")}>
            Lưu
          </button>
        </div>
      </div>
      <div className="">
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Thông tin chính">
            <TabsCourseInfo />
          </Tab>
          <Tab eventKey="profile" title="Danh sách video bài giảng">
            Video bài giảng
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
