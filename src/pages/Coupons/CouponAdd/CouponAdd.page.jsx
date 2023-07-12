import moment from "moment";
import React from "react";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import categoriescoursesApi from "../../../api/categoriescoursesApi";
import couponsApi from "../../../api/couponsApi";
import CustomDatePicker from "../../../components/DatePicker/DatePicker.component";
import SimpleSelect from "../../../components/Select/SimpleSelect";

export default function CouponAdd(props) {
  const { state } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const isEdit = state && state.data ? true : false;
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit ? state.data : {},
  });

  const nav = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    data.user_created = currentUser.username;
    if (isEdit) {
      await handleEdit(data);
    } else {
      await handleAdd(data);
    }
  };

  const handleAdd = async (data) => {
    try {
      const res = await couponsApi.add(data);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thêm thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        nav("/coupons");
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
      const res = await couponsApi.update(data.code, data);

      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Sửa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        nav("/coupons");
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
          {isEdit ? "SỬA COUPON" : "THÊM MỚI COUPON"}
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
                    <Form.Label>Code</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("code", { required: true })}
                    />
                    {errors.code && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên Coupon</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Giá trị</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("value", { required: true })}
                    />
                    {errors.value && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Loại</Form.Label>
                    {/* <Form.Control
                      type="text"
                      {...register("type", { required: true })}
                    /> */}
                    <SimpleSelect
                      control={control}
                      required={true}
                      field={"type"}
                      placeholder="Chọn loại coupon"
                      options={[
                        { value: "%", label: "Giảm theo phần trăm hóa đơn" },
                        { value: "vnd", label: "Giảm theo số tiền cố định" },
                      ]}
                    />
                    {errors.type && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tổng số lượng</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("num", { required: true })}
                    />
                    {errors.num && <p className="form__error">Vui lòng nhập</p>}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Số lượng còn lại</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("numberOfRemain", { required: true })}
                    />
                    {errors.numberOfRemain && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6} sm={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ngày bắt đầu</Form.Label>
                    <CustomDatePicker
                      required={true}
                      control={control}
                      field={"startDate"}
                    />
                    {errors.startDate && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Ngày kết thúc</Form.Label>
                    <CustomDatePicker
                      control={control}
                      field={"expiredDate"}
                      required={true}
                      validate={(value) => {
                        return (
                          !value ||
                          moment(value).isSameOrAfter(
                            getValues("startDate"),
                            "day"
                          )
                        );
                      }}
                    />
                    {errors.expiredDate?.type === "validate" && (
                      <p className="form__error">
                        Ngày kết thúc phải sau ngày bắt đầu
                      </p>
                    )}
                    {errors.expiredDate?.type === "required" && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control
                      as="textarea"
                      style={{ minHeight: "107px" }}
                      {...register("description", { required: true })}
                    />
                    {errors.description && (
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
