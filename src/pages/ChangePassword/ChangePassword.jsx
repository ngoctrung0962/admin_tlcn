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

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

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
    let dataPOST = {
      username: user.username,
      oldPwd: data.oldPwd,
      newPwd: data.newPwd,
      confirmPwd: data.confirmPwd,
    };
    try {
      setLoading(true);
      const res = await userApi.changepassword(dataPOST);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Đổi mật khẩu thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Đổi mật khẩu thất bại",
          text: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setLoading(false);
    } catch (error) {}
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="content__head d-flex  justify-content-between">
          <h3 className="content__title ">Thay đổi mật khẩu</h3>
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
                  <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu cũ</Form.Label>
                    <Form.Control
                      type="password"
                      {...register("oldPwd", { required: true })}
                    />

                    {errors.oldPwd && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                      type="password"
                      {...register("newPwd", { required: true })}
                    />

                    {errors.newPwd && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                    <Form.Control
                      type="password"
                      {...register("confirmPwd", {
                        required: true,
                        validate: (value) => value === getValues("newPwd"),
                      })}
                    />
                    {errors.confirmPwd?.type === "required" && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                    {errors.confirmPwd?.type === "validate" && (
                      <p className="form__error">
                        Mật khẩu xác nhận không khớp
                      </p>
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

export default ChangePassword;
