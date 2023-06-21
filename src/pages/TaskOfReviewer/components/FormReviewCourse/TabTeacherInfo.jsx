import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
export default function TabTeacherInfo({ registerUser }) {
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
    defaultValues: registerUser,
  });

  return (
    <div className="mt-2">
      <Form id="form_course_add">
        <Row>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3 d-flex justify-content-center flex-column">
              <Form.Label>Avatar giảng viên</Form.Label>
              <img
                src={
                  getValues("avatar")
                    ? getValues("avatar")
                    : require("../../../../assets/images/default-image.jpg")
                }
                alt="avatar"
                style={{
                  height: "200px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  padding: "2px",
                  background: "gray",
                  borderRadius: "5px",
                  margin: "0 auto",
                }}
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" {...register("email")} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control type="text" {...register("phone")} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên giảng viên</Form.Label>
              <Form.Control type="text" {...register("fullname")} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giới tính</Form.Label>
              <Form.Control type="text" {...register("gender")} readOnly />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
