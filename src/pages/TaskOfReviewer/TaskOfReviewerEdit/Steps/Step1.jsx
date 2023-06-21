import { Fab } from "@mui/material";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import MUIAddIcon from "@mui/icons-material/Add";
import SelectCategoriesAsync from "../../../../components/Select/SelectCategoriesAsync";
import SimpleSelect from "../../../../components/Select/SimpleSelect";
import SunEditor from "suneditor-react";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import uploadFileApi from "../../../../api/uploadFileApi";
import coursesApi from "../../../../api/coursesApi";
import Swal from "sweetalert2";

export default function Step1({
  currentStep,
  setCurrentStep,
  dataCourseTemp,
  setDataCourseTemp,
}) {
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
    defaultValues: {
      sessionId: dataCourseTemp?.id,
      name: dataCourseTemp?.summaryInfo?.name,
      category: {
        value: dataCourseTemp?.summaryInfo?.category?.id,
        label: dataCourseTemp?.summaryInfo?.category?.name,
      },
      price: dataCourseTemp?.summaryInfo?.price,
      activeWhenApproved: dataCourseTemp?.summaryInfo?.activeWhenApproved,
      language: dataCourseTemp?.summaryInfo?.language,
      avatar: dataCourseTemp?.summaryInfo?.avatar,
      description: dataCourseTemp?.summaryInfo?.description,
      isPublic: dataCourseTemp?.summaryInfo?.isPublic,
    },
  });

  const buttonChooseFile = useRef();

  const handleUploadImageBefore = async (files, info, uploadHandler) => {
    // uploadHandler(files);

    const formData = new FormData();
    formData.append("files", files[0]);
    const promise = new Promise((resolve, reject) => {
      const addImage = async () => {
        try {
          const res = await uploadFileApi.upLoadFile(formData);
          resolve(res.data[0]);
        } catch (error) {
          reject(error);
        }
      };
      addImage();
    });

    promise
      .then((res) => {
        const data = {
          // The response must have a "result" array.
          result: [
            {
              url: res,
              name: files[0].name,
              size: files[0].size,
            },
          ],
        };
        uploadHandler(data);
        return undefined;
      })
      .catch((err) => {
        console.log("err", err);
      });

    return undefined;
  };
  const handleImageUpload = async (
    targetImgElement,
    index,
    state,
    imageInfo,
    remainingFilesCount
  ) => {
    console.log("target", targetImgElement);
    console.log("image", imageInfo);
    // Thay đổi đường dẫn ảnh
    // targetImgElement.src = imageInfo.src;
  };

  const onSubmit = async (data) => {
    // format data before send to server

    data.category = data?.category?.value;
    if (data.avatarFile?.[0]) {
      data.avatar = data.avatarFile?.[0];
    }
    delete data.avatarFile;
    if (data.avatar === undefined) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra",
        text: "Vui lòng chọn ảnh đại diện",
      });
      return;
    }
    // Chuyển sang formData
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // log formData
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      const res = await coursesApi.submitSumary(formData);
      if (res.errorCode === "") {
        setDataCourseTemp(res.data);
        setCurrentStep(currentStep + 1);
      } else {
        Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: res.message,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <Form id="form_course_add" onSubmit={handleSubmit(onSubmit)}>
        <Row>
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
                field={"isPublic"}
                placeholder="Chọn trạng thái"
                options={[
                  { value: true, label: "Miễn phí" },
                  { value: false, label: "Có phí" },
                ]}
                onChangeOption={(e) => {
                  if (e.value === true) {
                    setValue("price", 0);
                  }
                }}
              />
              {errors.isPublic && <p className="form__error">Vui lòng nhập</p>}
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
              />
              {errors.activeWhenApproved && (
                <p className="form__error">Vui lòng nhập</p>
              )}
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
                required={true}
              />

              {errors.language && <p className="form__error">Vui lòng nhập</p>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>

            <SunEditor
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
              onChange={(content) => {
                setValue("description", content);
              }}
              height="100%"
              setDefaultStyle="font-family: 'Readex Pro', sans-serif; "
              onImageUploadBefore={handleUploadImageBefore}
              onImageUpload={handleImageUpload}
            />
          </Form.Group>
        </Row>
      </Form>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          gap: "10px",
        }}
      >
        <button className="main__btn" onClick={() => handleSubmit(onSubmit)()}>
          Next
        </button>
      </div>
    </div>
  );
}
