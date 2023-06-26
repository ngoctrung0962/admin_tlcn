import { Fab } from "@mui/material";
import React, { useEffect, useState } from "react";

import MUIAddIcon from "@mui/icons-material/Add";
import { useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userApi from "../../api/userApi";
import CustomDatePicker from "../../components/DatePicker/DatePicker.component";
import Loading from "../../components/Loading/Loading.component";
import SimpleSelect from "../../components/Select/SimpleSelect";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const user = useSelector((state) => state.user.currentUser);

  const fetchData = async () => {
    setLoading(true);
    const res = await userApi.get(user?.username);
    if (res.errorCode === "") {
      setUserDetail(res.data);
    }
    setLoading(false);
  };
  const hanleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    setValue("avatarFile", e.target.files);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await userApi.changeAvatar(user?.username, formData);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thay đổi ảnh đại diện thành công",
          showConfirmButton: false,
          timer: 1500,
        });

        fetchData();
      }
    } catch (error) {}
  };

  const nav = useNavigate();
  const buttonChooseFile = useRef();

  // react hook form
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
    try {
      setLoading(true);
      const res = await userApi.changeInfo(user?.username, data);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thông tin thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Cập nhật thông tin thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userDetail) {
      reset({
        fullname: userDetail.fullname,
        email: userDetail.email,
        phone: userDetail.phone,
        gender: userDetail.gender,
        birthdate: userDetail.birthdate,
      });
    }
  }, [userDetail]);

  return (
    <div>
      <div className="container-fluid">
        <div className="content__head d-flex  justify-content-between">
          <h3 className="content__title ">Quản lí thông tin tài khoản</h3>
          <div className="content__tool">
            <button
              className="main__btn"
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
        </div>
        <div className="container__tablee p-3">
          {loading ? (
            <div className="d-flex justify-content-center">
              <Loading />
            </div>
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3 d-flex justify-content-center flex-column">
                    <Form.Label>Ảnh đại diện </Form.Label>
                    <Form.Control
                      hidden
                      accept="image/*"
                      type="file"
                      ref={buttonChooseFile}
                      onChange={(e) => {
                        hanleChangeAvatar(e);
                      }}
                    />
                    <img
                      src={userDetail?.avatar}
                      alt="avatar"
                      style={{
                        height: "158px",
                        width: "auto",
                        objectFit: "contain",
                        display: "block",
                        padding: "10px",
                        borderRadius: "50%",
                        margin: "0 auto",
                        backgroundColor: "#f1f1f1",
                      }}
                    />
                    <div className="d-flex justify-content-center mt-1">
                      <Fab
                        style={{
                          backgroundColor: "#00693e",
                          color: "white",
                          borderRadius: "3px",
                          zIndex: 1,
                        }}
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                        onClick={() => {
                          console.log("log");
                          buttonChooseFile.current?.click();
                        }}
                      >
                        <MUIAddIcon fontSize="9" />
                        <p
                          style={{
                            fontSize: 9,
                            padding: 10,
                            margin: 0,
                          }}
                        >
                          Thay đổi ảnh đại diện
                        </p>
                      </Fab>
                    </div>

                    {errors.avatar && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("fullname", { required: true })}
                    />
                    {errors.fullname && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Giới tính</Form.Label>
                    <SimpleSelect
                      control={control}
                      field={"gender"}
                      placeholder="Chọn trạng thái"
                      options={[
                        { value: "nu", label: "Nữ" },
                        { value: "nam", label: "Nam" },
                      ]}
                    />
                    {errors.gender && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Ngày sinh</Form.Label>
                    <CustomDatePicker control={control} field={"birthdate"} />
                    {errors.birthdate && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("phone", { required: true })}
                    />

                    {errors.phone && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
