import React from "react";
import { useState } from "react";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import requestTeacherApi from "../../../api/requestTeacherApi";
import Swal from "sweetalert2";
import { useEffect } from "react";
import Loading from "../../../components/Loading/Loading.component";
import { formatDateDisplay } from "../../../utils/MyUtils";

export default function ModalWatchInfo({
  dataInfo,
  hanleExitModal,
  fetchData,
}) {
  const [dataRequestTeacher, setDataRequestTeacher] = useState();
  console.log("dataRequestTeacher", dataRequestTeacher);
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    formState: { errors },
  } = useForm({});

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

  const fetchRequestTeacherById = async (id) => {
    try {
      const res = await requestTeacherApi.getRequestById(id);
      if (res.errorCode == "") {
        setDataRequestTeacher(res.data);
        reset(res.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (dataInfo) {
      fetchRequestTeacherById(dataInfo.id);
    }
  }, [dataInfo]);

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
        {dataRequestTeacher ? (
          <Form
            style={{
              maxHeight: "70vh",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            <Row className="px-3">
              <Col md={6} xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email"
                    readOnly
                    {...register("userInfoDto.fullname", { required: true })}
                  />
                  {errors.email && <p className="form__error">Vui lòng nhập</p>}
                </Form.Group>
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
                  <Form.Label>Ngày sinh</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly={true}
                    value={formatDateDisplay(
                      dataRequestTeacher?.userInfoDto?.birthdate
                    )}
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
                  <Form.Label>Giới tính</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly={true}
                    value={
                      dataRequestTeacher?.userInfoDto?.gender === "nam"
                        ? "Nam"
                        : "Nữ"
                    }
                  />
                </Form.Group>
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
            <Row className="px-3">
              <Form.Label>Chứng chỉ</Form.Label>
              {dataRequestTeacher &&
                dataRequestTeacher?.certs?.map((item, index) => {
                  return (
                    <Col md={6} sm={12}>
                      <img
                        src={item?.link}
                        alt="avatar"
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "contain",
                          padding: "3px",
                          background: "#f1f1f1",
                          borderRadius: "10px",
                          margin: "10px auto",
                        }}
                      />
                    </Col>
                  );
                })}
            </Row>
          </Form>
        ) : (
          <Loading />
        )}
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
