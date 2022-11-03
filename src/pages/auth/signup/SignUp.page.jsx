import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className="row m-0 signin__page d-flex justify-content-center align-items-center">
      <div className="col-12 signin__page-inner d-flex  justify-content-center align-items-center">
        <div className="col-12 col-md-6 d-flex  flex-column justify-content-center align-items-center">
          <img
            src={require("../../../assets/images/logo.gif")}
            width={"auto"}
            height={100}
            alt=""
            className="mb-2"
          />
          <h1 className="login__title mb-5 text-center">ĐĂNG KÍ</h1>
          <Form className="form__login d-flex flex-column gap-3 align-items-center">
            <TextField label="Họ tên" className="w-100" />

            <TextField label="Tên đăng nhập/ Email" className="w-100" />
            <TextField label="Mật khẩu" type="password" className="w-100" />
            <TextField
              label="Nhập lại mật khẩu"
              type="password"
              className="w-100"
            />

            <div className="d-flex flex-row w-100 justify-content-between align-items-center">
              <Link className="link_to_signup" to="/signup">
                Bạn đã có tài khoản? Đăng nhập ngay
              </Link>
            </div>
            <Button className="btn_login mt-3" variant="outlined">
              Đăng kí
            </Button>
          </Form>
        </div>
        <div className="col-12 col-md-6 d-none d-md-block ">
          <img
            className="img-fluid"
            src={require("../../../assets/images/65012-learning-concept.gif")}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
