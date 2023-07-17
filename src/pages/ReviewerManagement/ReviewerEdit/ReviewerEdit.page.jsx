import React, { useEffect, useState } from "react";
import { Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import categoriescoursesApi from "../../../api/categoriescoursesApi";
import SelectAsync from "../../../components/Select/SelectAsync";
import SimpleSelect from "../../../components/Select/SimpleSelect";
import CustomDatePicker from "../../../components/DatePicker/DatePicker.component";
import reviewerApi from "../../../api/reviewerApi";
import { formatDateDisplay } from "../../../utils/MyUtils";
import SelectCategoriesAsync from "../../../components/Select/SelectCategoriesAsync";

export default function ReviewerEdit() {
  const { id } = useParams();
  const fetchData = async () => {
    const res = await reviewerApi.getDetailReviewer(id);
    console.log(res.data);
    reset({
      username: res.data.username,
      fullname: res.data.fullname,
      birthdate: res.data.birthdate,
      gender: res.data.gender,
      phone: res.data.phone,
      email: res.data.email,
      categories: res.data.categories.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      }),
    });
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const nav = useNavigate();
  const onSubmit = async (data) => {
    handleAdd(data);
  };

  const handleAdd = async (data) => {
    data.birthdate = new Date(data.birthdate).toISOString().slice(0, 10);
    data.categories = data.categories.map((item) => item.value).join(",");
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    try {
      const res = await reviewerApi.addReviewer(formData);
      if (res.errorCode === "") {
        Swal.fire({
          icon: "success",
          title: "Thêm thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        nav("/managementreviewer");
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

  return (
    <div className="containerr px-3">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">XEM THÔNG TIN NGƯỜI KIỂM DUYỆT</h3>
        <div className="content__tool ">
          <button className="main__btn me-2" onClick={() => nav(-1)}>
            Trở về
          </button>
        </div>
      </div>
      <div className="">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>

                <Form.Control
                  type="text"
                  {...register("username", { required: true })}
                  readOnly
                />
                {errors.username && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Họ và tên</Form.Label>

                <Form.Control
                  type="text"
                  {...register("fullname", { required: true })}
                  readOnly
                />
                {errors.fullname && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ngày sinh</Form.Label>
                <CustomDatePicker
                  control={control}
                  field={"birthdate"}
                  readOnly={true}
                />
                {errors.birthdate && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Loại chuyên môn</Form.Label>
                <SelectCategoriesAsync
                  control={control}
                  field={"categories"}
                  placeholder="Chọn loại khóa học"
                  api={"categories"}
                  valueField={"id"}
                  labelField={"name"}
                  isClearable={true}
                  required={true}
                  isMulti={true}
                  isDisabled={true}
                />
                {errors.categories && (
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
                  isDisabled={true}
                />
                {errors.gender && <p className="form__error">Vui lòng nhập</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  {...register("phone", { required: true })}
                  readOnly
                />

                {errors.phone && <p className="form__error">Vui lòng nhập</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  {...register("email", { required: true })}
                  readOnly
                />
                {errors.email && <p className="form__error">Vui lòng nhập</p>}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
