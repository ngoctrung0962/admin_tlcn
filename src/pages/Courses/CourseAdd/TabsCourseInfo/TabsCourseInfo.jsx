import { Fab } from "@mui/material";
import React, { useEffect } from "react";
import { useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "../../../../components/DatePicker/DatePicker.component";
import SelectCategoriesAsync from "../../../../components/Select/SelectCategoriesAsync";
import MUIAddIcon from "@mui/icons-material/Add";
import SimpleSelect from "../../../../components/Select/SimpleSelect";
import SelectAsync from "../../../../components/Select/SelectAsync";
export default function TabsCourseInfo({
  handleSubmit,
  register,
  errors,
  isEdit,
  state,
  course,
  reset,
  onSubmit,
  control,
  watch,
  setValue,
  getValues,
}) {
  useEffect(() => {
    reset(course);
  }, [course]);

  const nav = useNavigate();

  const buttonChooseFile = useRef();
  return (
    <Form id="form_course_add" onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Col md={6} sm={12}>
          <Form.Group className="mb-3 d-flex justify-content-center flex-column">
            <Form.Label>Avatar khóa học</Form.Label>
            <Form.Control
              hidden
              accept="image/*"
              type="file"
              ref={buttonChooseFile}
              onChange={(e) => {
                setValue("avatarFile", e.target.files);
              }}
            />
            <img
              src={
                watch("avatarFile")?.[0]
                  ? URL.createObjectURL(watch("avatarFile")[0])
                  : getValues("avatar") ||
                    require("../../../../assets/images/default-image.jpg")
              }
              alt="avatar"
              style={{
                height: "95px",
                width: "auto",
                maxWidth: "200px",
                objectFit: "contain",
                display: "block",
                padding: "10px",
                background: "gray",
                borderRadius: "10px",
                margin: "0 auto",
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
                  Tải lên hình ảnh
                </p>
              </Fab>
            </div>

            {errors.avatar && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên khóa học</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Loại khóa học</Form.Label>
            <SelectCategoriesAsync
              control={control}
              field={"category"}
              placeholder="Chọn loại khóa học"
              api={"categories"}
              valueField={"id"}
              labelField={"name"}
              isClearable={true}
              required={true}
            />
            {errors.category && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngôn ngữ</Form.Label>
            <Form.Control
              type="text"
              {...register("language", { required: true })}
            />
            {errors.language && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="text"
              {...register("price", { required: true })}
            />
            {errors.price && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Public</Form.Label>
            <SimpleSelect
              control={control}
              field={"public"}
              placeholder="Chọn trạng thái"
              options={[
                { value: true, label: "Miễn phí" },
                { value: false, label: "Có phí" },
              ]}
            />
            {errors.public && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Giảng viên</Form.Label>
            <SelectAsync
              control={control}
              field={"accountName"}
              placeholder="Chọn giảng viên"
              api={"accounts"}
              valueField={"username"}
              labelField={"username"}
              isClearable={true}
              required={true}
            />
            {errors.category && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              {...register("description", { required: true })}
            />
            {errors.description && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}
