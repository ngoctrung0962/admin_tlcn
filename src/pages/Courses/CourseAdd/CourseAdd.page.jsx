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
export default function CourseAdd({ isEdit }) {
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

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: isEdit ? course : {},
  });

  const onSubmit = async (data) => {
    data.category = data.category.id;
    data.accountName = data.accountName.username;
    data.avatar = data.avatarFile?.[0];
    delete data.avatarFile;
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    try {
      if (isEdit) {
        await handleEdit(formData);
      } else {
        await handleAdd(formData);
      }
    } catch (error) {}
  };
  const nav = useNavigate();

  const handleAdd = async (data) => {
    try {
      const res = await coursesApi.add(data);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thêm thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        nav("/courses");
      } else {
        Swal.fire({
          icon: "error",
          title: "Thêm thất bại",
          text: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };
  const handleEdit = async (data) => {
    try {
      const res = await coursesApi.update(data.get("id"), data);

      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Sửa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        nav("/courses");
      } else {
        Swal.fire({
          icon: "error",
          title: "Sửa thất bại",
          text: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };
  return (
    <div className="container">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">
          {isEdit ? "Sửa khóa học" : "Thêm khóa học"}
        </h3>

        <div className="content__tool ">
          <button
            className="main__btn me-2"
            onClick={() => nav(-1)}
            disabled={isSubmitting}
          >
            Hủy
          </button>
          <button
            className="main__btn"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang lưu..." : "Lưu"}
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
            <TabsCourseInfo
              course={course}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              control={control}
              isEdit={isEdit}
              reset={reset}
              getValues={getValues}
              setValue={setValue}
              onSubmit={onSubmit}
              watch={watch}
            />
          </Tab>
          {isEdit && (
            <Tab eventKey="chapter" title="Danh sách chapter">
              <TabsChapterList course={course} getValues={getValues} />
            </Tab>
          )}
          {isEdit && (
            <Tab
              eventKey="profile"
              title="Danh sách video bài giảng"
              unmountOnExit
            >
              <TabsVideoCourseList course={course} getValues={getValues} />
            </Tab>
          )}
        </Tabs>
      </div>
    </div>
  );
}
