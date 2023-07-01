import React, { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Loading from "../../../components/Loading/Loading.component";
import Swal from "sweetalert2";
import ModalRegisterTeacherProfile from "../ModalRegisterTeacherProfile/ModalRegisterTeacherProfile";

export default function TabTeacherProfile({ user }) {
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
  const [teacherProfile, setTeacherProfile] = useState(null);
  console.log("teacherProfile", teacherProfile);
  const fetchDataProfile = async () => {
    setLoading(true);
    try {
      const res = await userApi.teacherGetProfile(user?.username);
      if (res.errorCode == "") {
        setTeacherProfile(res.data);
        reset({
          aboutMe: res.data.aboutMe,
          caption: res.data.caption,
          facebookLink: res.data.facebookLink,
          youtubeLink: res.data.youtubeLink,
          linkedinLink: res.data.linkedinLink,
        });
      }
    } catch (error) {}
    setLoading(false);
  };

  const [showModalRegister, setShowModalRegister] = useState(false);

  // react hook form

  useEffect(() => {
    fetchDataProfile();
  }, []);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await userApi.teacherUpdateProfile(data);
      if (res.errorCode == "") {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchDataProfile();
      }
    } catch (error) {}
    setLoading(false);
  };
  return (
    <div>
      {showModalRegister && (
        <ModalRegisterTeacherProfile
          hanleExitModal={() => setShowModalRegister(false)}
          fetchDataProfile={fetchDataProfile}
        />
      )}
      <div
        style={{
          display: teacherProfile ? "none" : "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          className="main__btn mb-3"
          onClick={() => setShowModalRegister(true)}
        >
          Đăng ký thông tin giảng viên
        </button>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Loading />
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              className="main__btn mb-3"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
            >
              Cập nhật
              {loading && (
                <div
                  className="spinner-border spinner-border-sm ms-2"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </button>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6} sm={12}>
                <Form.Group className="mb-3 d-flex justify-content-center flex-column">
                  <Form.Label>Giới thiệu bản thân </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register("aboutMe")}
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex justify-content-center flex-column">
                  <Form.Label>Chú thích </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register("caption")}
                  />
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
        </div>
      )}
    </div>
  );
}
