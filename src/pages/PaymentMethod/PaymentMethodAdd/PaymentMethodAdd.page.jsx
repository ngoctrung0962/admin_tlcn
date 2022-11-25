import React from "react";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import paymentApi from "../../../api/paymentApi";

export default function PaymentMethodAdd(props) {
  const { state } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const isEdit = state && state.data ? true : false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? state.data : {},
  });

  const nav = useNavigate();
  const onSubmit = async (data) => {

    if (isEdit) {
      await handleEdit(data);
    } else {
      await handleAdd(data);
    }
  };

  const handleAdd = async (data) => {
    try {
      const res = await paymentApi.add(data);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thêm thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        nav("/payments");
      } else {
        Swal.fire({
          icon: "error",
          title: "Thêm thất bại",
          text: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };
  const handleEdit = async (data) => {
    try {
      const res = await paymentApi.update(data);

      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Sửa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        nav("/payments");
      } else {
        Swal.fire({
          icon: "error",
          title: "Sửa thất bại",
          text: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {}
  };
  return (
    <div className="container">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">
          {isEdit
            ? "SỬA phương thức thanh toán"
            : "THÊM MỚI phương thức thanh toán"}
        </h3>
        <div className="content__tool ">
          <button className="main__btn me-2" onClick={() => nav(-1)}>
            Hủy
          </button>
          <button className="main__btn" onClick={handleSubmit(onSubmit)}>
            Lưu
          </button>
        </div>
      </div>
      <div className="">
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Thông tin chính">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-3">
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên phương thức thanh toán</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
