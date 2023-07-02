import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import userApi from "../../../api/userApi";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
export default function ForgotPass() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmitResetPass = async (data) => {
    const email = data.email;
    const response = await userApi.forgotPassword(email);
    console.log(response)
    if(response.errorCode === ""){
      Swal.fire({
        icon: "success",
        iconHtml: "👍",
        title: "Gửi yêu cầu đổi mật khẩu thành công",
        text: "Chúng tôi đã gửi link đổi mật khẩu qua email cho bạn, vui lòng đợi trong giây lát",
      });

    }else{
      Swal.fire({
        icon: "error",
        iconHtml: "👎",
        title: "Gửi yêu cầu đổi mật khẩu thất bại",
        text: response?.message,
        allowOutsideClick: true,
      });
    }
  }
  return (
    <div className="row m-0 signin__page d-flex justify-content-center align-items-center">
      <div className="col-12 signin__page-inner d-flex  justify-content-center align-items-center">
        <div className="col-12 col-md-6 d-flex  flex-column justify-content-center align-items-center">
          <h1 className="login__title mb-5 text-center">QUÊN MẬT KHẨU</h1>
          <Form className="form__login d-flex flex-column gap-3 align-items-center"
                onSubmit={handleSubmit(onSubmitResetPass)}>
            <Form.Group className="w-100">
              <TextField
                  label="Email liên kêt với tài khoản"
                  className="w-100"
                  {...register("email", { required: true })}
              />
              {errors.email && (
                  <span className="text-danger form__error">
                    Vui lòng nhập email
                  </span>
              )}
            </Form.Group>

            <div className="d-flex flex-row w-100 justify-content-between align-items-center">
              <Link className="link_to_signup" to="/signin">
                Quay trở lại đăng nhập
              </Link>
            </div>
            <Button className="btn_login mt-3" variant="outlined" onClick={handleSubmit(onSubmitResetPass)}>
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
