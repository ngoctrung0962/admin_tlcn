import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import userApi from "../../../api/userApi";
export default function ModalDetailOrder(props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: props.userDetail?.email,
      phone: props.userDetail?.phone,
    },
  });

  const onSubmit = async (data) => {
    const res = await userApi.requestBecomeTeacher(data);
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Yêu cầu trở thành giảng viên thành công",
      });
      props.onHide();
    } else {
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        text: "Yêu cầu trở thành giảng viên thất bại",
      });
    }
  };
  return (
    <Modal
      {...props}
      show="true"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Chi tiết đơn hàng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form yêu cầu trở thành giảng viên */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  readOnly
                  {...register("email", { required: true })}
                />
                {errors.email && <p className="form__error">Vui lòng nhập</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  {...register("phone", { required: true })}
                />
                {errors.phone && <p className="form__error">Vui lòng nhập</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập địa chỉ"
                  {...register("address", { required: true })}
                />
                {errors.address && <p className="form__error">Vui lòng nhập</p>}
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Nghề nghiệp hiện tại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập mô tả"
                  {...register("currentJob", { required: true })}
                />
                {errors.currentJob && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Chủ đề giảng dạy</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập chủ đề"
                  {...register("teachingTopic", { required: true })}
                />
                {errors.teachingTopic && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kinh nghiệm giảng dạy</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập mô tả"
                  {...register("expDescribe", { required: true })}
                />
                {errors.expDescribe && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button
          className="account__btn"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting ? true : false}
        >
          {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
        </Button> */}
        <Button
          className="account__btn"
          onClick={props.onHide}
          disabled={isSubmitting ? true : false}
        >
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
