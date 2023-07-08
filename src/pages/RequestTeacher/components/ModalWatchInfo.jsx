import React from "react";
import { useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import requestTeacherApi from "../../../api/requestTeacherApi";
import Swal from "sweetalert2";

export default function ModalWatchInfo({
  dataInfo,
  hanleExitModal,
  fetchData,
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,

    formState: { errors },
  } = useForm({
    defaultValues: dataInfo,
  });

  const handleAccept = async (id) => {
    setLoading(true);
    const res = await requestTeacherApi.acceptRequestTeacher(id);
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchData();
    } else {
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
    hanleExitModal();
  };
  const handleReject = async (id) => {
    setLoading(true);
    const res = await requestTeacherApi.rejectRequestTeacher(id);
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      fetchData();
    } else {
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    hanleExitModal();
    setLoading(false);
  };
  return (
    <Modal
      show="true"
      centered
      size="lg"
      onHide={() => {
        hanleExitModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Chi tiết yêu cầu trở thành giảng viên
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="px-3">
            <Col md={6} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  {...register("email", { required: true })}
                  readOnly={true}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  {...register("phone", { required: true })}
                  readOnly={true}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  {...register("address", { required: true })}
                  readOnly={true}
                />
              </Form.Group>
            </Col>
            <Col md={6} xs={12}>
              <Form.Group className="mb-3">
                <Form.Label>Nghề nghiệp hiện tại</Form.Label>
                <Form.Control
                  type="text"
                  {...register("currentJob", { required: true })}
                  readOnly={true}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Chủ đề giảng dạy</Form.Label>
                <Form.Control
                  type="text"
                  {...register("teachingTopic", { required: true })}
                  readOnly={true}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kinh nghiệm giảng dạy</Form.Label>
                <Form.Control
                  type="text"
                  {...register("expDescribe", { required: true })}
                  readOnly={true}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {dataInfo?.status === "OPENING" ? (
          <>
            <button
              className="btn btn-secondary btn__footer__modal"
              onClick={() => handleAccept(dataInfo.id)}
              disabled={loading}
            >
              Chấp nhận yêu cầu
              {loading && (
                <div
                  className="spinner-border spinner-border-sm ms-2"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
            <button
              className="btn btn-secondary btn__footer__modal"
              onClick={() => handleReject(dataInfo.id)}
              disabled={loading}
            >
              Từ chối
              {loading && (
                <div
                  className="spinner-border spinner-border-sm ms-2"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
          </>
        ) : (
          <button
            className="btn btn-secondary btn__footer__modal"
            onClick={() => hanleExitModal()}
          >
            Đóng
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
