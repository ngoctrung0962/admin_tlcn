import React, { useEffect, useState } from "react";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import categoriescoursesApi from "../../../api/categoriescoursesApi";
import reviewApi from "../../../api/reviewApi";
import SelectAsync from "../../../components/Select/SelectAsync";
import SimpleSelect from "../../../components/Select/SimpleSelect";

export default function ReviewAdd({ isEdit }) {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await reviewApi.getbyId(id);
      console.log(res.data);
      reset(res.data);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const nav = useNavigate();
  const onSubmit = async (data) => {
    data.username = currentUser.username;
    data.courseId = data.courseId.id;
    if (isEdit) {
      await handleEdit(data);
    } else {
      // await handleAdd(data);
      const res = await reviewApi.add(data);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thêm thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        nav(-1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Thêm thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleAdd = async (data) => {
    try {
      const res = await categoriescoursesApi.add(data);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thêm thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        nav("/categories");
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
      const res = await categoriescoursesApi.update(data.id, data);

      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Sửa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        nav("/categories");
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
    <div className="containerr px-3">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">
          {isEdit ? "XEM ĐÁNH GIÁ" : "THÊM MỚI ĐÁNH GIÁ"}
        </h3>
        <div className="content__tool ">
          <button className="main__btn me-2" onClick={() => nav(-1)}>
            Hủy
          </button>
          <button
            className="main__btn"
            onClick={handleSubmit(onSubmit)}
            hidden={isEdit}
          >
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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Khóa học</Form.Label>

                    <SelectAsync
                      control={control}
                      field={"courseId"}
                      placeholder="Chọn khóa học"
                      api={"courses"}
                      valueField={"id"}
                      labelField={"name"}
                      isClearable={true}
                      required={true}
                      isDisabled={isEdit}
                    />
                    {errors.courseId && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nội dung</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("content", { required: true })}
                      readOnly={isEdit}
                    />
                    {errors.content && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rate</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("rate", { required: true })}
                      readOnly={isEdit}
                    />
                    {errors.rate && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
