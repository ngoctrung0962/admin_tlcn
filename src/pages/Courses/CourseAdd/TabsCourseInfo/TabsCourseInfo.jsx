import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import categoriescoursesApi from "../../../../api/categoriescoursesApi";
import CustomDatePicker from "../../../../components/DatePicker/DatePicker.component";

export default function TabsCourseInfo() {
  const { state } = useLocation();
  console.log(state);
  const isEdit = state && state.data ? true : false;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? state.data : {},
  });
  const onSubmit = async (data) => {
    if (isEdit) {
      await handleEdit(data);
    } else {
      await handleAdd(data);
    }
  };
  const nav = useNavigate();

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Col md={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Tên khóa học</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Loại khóa học</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngôn ngữ</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Người khởi tạo</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày khởi tạo</Form.Label>
            <CustomDatePicker control={control} field={"ngay_sinh"} />
            {errors.name && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Số học sinh</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
