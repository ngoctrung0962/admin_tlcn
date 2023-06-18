import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { MdOutlineAdd } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import TabsCourseInfo from "./TabsCourseInfo/TabsCourseInfo";
import coursesApi from "../../../api/coursesApi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import TabsVideoCourseList from "./TabsVideoCourseList/TabsVideoCourseList";
import TabsChapterList from "./TabsChapterList/TabsChapterList";
import { useSelector } from "react-redux";
import TabsContentList from "./TabsContent/TabsContentList";
import Steps from "./Steps";
export default function CourseEdit({ isEdit }) {
  const { currentUser } = useSelector((state) => state.user);
  const courseId = useLocation().pathname.split("/")[2];
  const [course, setCourse] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await coursesApi.get(courseId);
        const course = res.data;
        course.category = {
          ...course.category,
          value: course.category.id,
          label: course.category.name,
        };
        course.accountName = {
          ...course.accountName,
          value: course.accountName,
          label: course.accountName,
        };

        setCourse(course);
      } catch (error) {}
    };
    fetchData();
  }, [courseId]);

  const dataEdit = useLocation().state;
  console.log("dataEdit", dataEdit);

  return (
    <div className="containerr mx-3">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">
          {isEdit ? "Sửa khóa học" : "Thêm khóa học"}
        </h3>
      </div>
      <div className="">
        <Steps dataEdit={dataEdit} />
      </div>
    </div>
  );
}
