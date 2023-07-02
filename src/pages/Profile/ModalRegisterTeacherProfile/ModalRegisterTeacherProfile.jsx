import React from "react";
import { useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import userApi from "../../../api/userApi";
import Swal from "sweetalert2";

export default function ModalRegisterTeacherProfile({
  hanleExitModal,
  fetchDataProfile,
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await userApi.teacherRegisterProfile(data);
      if (res.errorCode == "") {
        Swal.fire({
          icon: "success",
          title: "Đăng kí thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchDataProfile();
        hanleExitModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Đăng kí thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
    setLoading(false);
  };
  return (
    <Modal
      show="true"
      centered
      onHide={() => {
        hanleExitModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Form đăng kí thông tin giảng viên
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className="px-3">
          <Row>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3 d-flex justify-content-center flex-column">
                <Form.Label>Giới thiệu bản thân </Form.Label>
                <Form.Control as="textarea" rows={3} {...register("aboutMe")} />
              </Form.Group>
              <Form.Group className="mb-3 d-flex justify-content-center flex-column">
                <Form.Label>Chú thích </Form.Label>
                <Form.Control as="textarea" rows={3} {...register("caption")} />
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3 d-flex justify-content-center flex-column">
                <Form.Label>Link Facebook </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("facebookLink")}
                />
              </Form.Group>
              <Form.Group className="mb-3 d-flex justify-content-center flex-column">
                <Form.Label>Link Youtobe </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("youtubeLink")}
                />
              </Form.Group>
              <Form.Group className="mb-3 d-flex justify-content-center flex-column">
                <Form.Label>Link Linked </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("linkedinLink")}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-secondary btn__footer__modal"
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          Đăng kí
          {loading && (
            <div
              className="spinner-border spinner-border-sm ms-2"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
