import React from "react";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import categoriescoursesApi from "../../../api/categoriescoursesApi";

export default function CategoriesCourseAdd(props) {
  const { state } = useLocation();
  console.log(state);
  const isEdit = state && state.data ? true : false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? state.data : {},
  });

  const nav = useNavigate();
  const onSubmit = async (data) => {
    if (isEdit) {
      await handleEdit(data);
    } else {
      await handleAdd(data);
    }
  };

  const handleAdd = async (data) => {
    try {
      const res = await categoriescoursesApi.add(data);
      console.log("A", res.errorCode);
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
      console.log("edit");
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
    <div className="container">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">THÊM MỚI LOẠI KHÓA HỌC</h3>
        <div className="content__tool ">
          <button className="main__btn me-2" onClick={() => nav(-1)}>
            Hủy
          </button>
          <button className="main__btn" onClick={handleSubmit(onSubmit)}>
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
                    <Form.Label>Tên loại khóa học</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}></Col>
              </Row>
            </Form>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
