import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function ForgotPass() {
  return (
    <div className="row m-0 signin__page d-flex justify-content-center align-items-center">
      <div className="col-12 signin__page-inner d-flex  justify-content-center align-items-center">
        <div className="col-12 col-md-6 d-flex  flex-column justify-content-center align-items-center">
          <h1 className="login__title mb-5 text-center">QUÊN MẬT KHẨU</h1>
          <Form className="form__login d-flex flex-column gap-3 align-items-center">
            <TextField
              label="Email của bạn"
              className="w-100"
              placeholder="Nhập địa chỉ email của bạn"
            />

            <div className="d-flex flex-row w-100 justify-content-between align-items-center">
              <Link className="link_to_signup" to="/signin">
                Quay trở lại đăng nhập
              </Link>
            </div>
            <Button className="btn_login mt-3" variant="outlined">
              Gửi yêu cầu lấy lại mật khẩu
            </Button>
          </Form>
        </div>
        <div className="col-12 col-md-6 d-none d-md-block ">
          <lottie-player
            src="https://assets3.lottiefiles.com/private_files/lf30_sxw84pnl.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}
