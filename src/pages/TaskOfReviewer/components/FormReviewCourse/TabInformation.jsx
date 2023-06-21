import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SimpleSelect from "../../../../components/Select/SimpleSelect";
import SunEditor from "suneditor-react";
import SelectCategoriesAsync from "../../../../components/Select/SelectCategoriesAsync";
export default function TabInformation({ summaryInfo }) {
  console.log("summaryInfo", summaryInfo);
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: summaryInfo,
  });

  return (
    <div className="mt-2">
      <Form id="form_course_add">
        <Row>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3 d-flex justify-content-center flex-column">
              <Form.Label>Avatar khóa học</Form.Label>
              <img
                src={
                  getValues("avatar")
                    ? getValues("avatar")
                    : require("../../../../assets/images/default-image.jpg")
                }
                alt="avatar"
                style={{
                  height: "200px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  padding: "2px",
                  background: "gray",
                  borderRadius: "5px",
                  margin: "0 auto",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tên khóa học</Form.Label>
              <Form.Control type="text" {...register("name")} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại khóa học</Form.Label>
              <Form.Control
                type="text"
                {...register("category.name")}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Giá</Form.Label>
              <Form.Control type="text" {...register("price")} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Public</Form.Label>
              <SimpleSelect
                control={control}
                field={"isPublic"}
                placeholder="Chọn trạng thái"
                options={[
                  { value: true, label: "Miễn phí" },
                  { value: false, label: "Có phí" },
                ]}
                isDisabled={true}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cho phép bán ngay khi được phê duyệt</Form.Label>
              <SimpleSelect
                control={control}
                field={"activeWhenApproved"}
                placeholder="Chọn trạng thái"
                options={[
                  { value: true, label: "Cho phép" },
                  { value: false, label: "Không cho phép" },
                ]}
                isDisabled={true}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngôn ngữ</Form.Label>
              <SimpleSelect
                control={control}
                field={"language"}
                placeholder="Chọn ngôn ngữ"
                options={[
                  { value: "Vietnamese", label: "Tiếng việt" },
                  { value: "English", label: "English" },
                ]}
                isDisabled={true}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>

            <SunEditor
              readOnly={true}
              setOptions={{
                buttonList: [
                  ["undo", "redo"],
                  ["font", "fontSize", "formatBlock"],
                  ["paragraphStyle", "blockquote"],
                  [
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "subscript",
                    "superscript",
                  ],
                  ["fontColor", "hiliteColor", "textStyle"],
                  ["removeFormat"],
                  ["outdent", "indent"],
                  ["align", "horizontalRule", "list", "lineHeight"],
                  ["table", "link", "image", "video", "audio"],
                  ["fullScreen", "showBlocks", "codeView"],
                  ["preview", "print"],
                ],
              }}
              setContents={getValues("description")}
              height="100%"
              setDefaultStyle="font-family: 'Readex Pro', sans-serif; "
            />
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
