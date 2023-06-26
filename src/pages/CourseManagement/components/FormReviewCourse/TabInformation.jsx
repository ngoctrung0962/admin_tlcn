import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SimpleSelect from "../../../../components/Select/SimpleSelect";
import SunEditor from "suneditor-react";
import SelectCategoriesAsync from "../../../../components/Select/SelectCategoriesAsync";
import uploadFileApi from "../../../../api/uploadFileApi";
import { useRef } from "react";
import { Fab } from "@mui/material";
import MUIAddIcon from "@mui/icons-material/Add";
import coursesApi from "../../../../api/coursesApi";
import Loading from "../../../../components/Loading/Loading.component";
import Swal from "sweetalert2";

export default function TabInformation({ idCourse }) {
  const [loading, setLoading] = useState(false);
  const [summaryInfo, setSummaryInfo] = useState();
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({});

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
  const buttonChooseFile = useRef();

  const onSubmit = async (data) => {
    delete data.category;
    const dataPOST = {
      id: idCourse,
      name: data.name,
      price: data.price,
      language: data.language,
      avatar: data.avatar,
      description: data.description,
      isPublic: data.public,
    };
    try {
      setLoading(true);
      const res = await coursesApi.teacherUpdateSumaryInfo(dataPOST);
      if (res.errorCode == "") {
        Swal.fire({
          icon: "success",
          iconHtml: "👍",
          title: "Cập nhật thành công",
          text: "Thông tin khóa học đã được cập nhật",
        });
        getSummaryInfo();
      }
      setLoading(false);
    } catch (error) {}
  };

  const getSummaryInfo = async () => {
    try {
      setLoading(true);
      const res = await coursesApi.teacherGetCourseDetail(idCourse);
      if (res.errorCode == "") {
        setSummaryInfo(res.data);
        reset({
          name: res.data.name,
          category: {
            value: res.data.category.id,
            label: res.data.category.name,
          },
          price: res.data.price,
          language: res.data.language,
          avatar: res.data.avatar,
          description: res.data.description,
          public: res.data.public,
        });
      }
      setLoading(false);
    } catch (error) {}
  };

  const handleChangeAvatar = async (e) => {
    const formData = new FormData();
    formData.append("files", e);
    try {
      const res = await uploadFileApi.upLoadFile(formData);
      if (res.errorCode == "") {
        setValue("avatar", res.data[0]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getSummaryInfo();
  }, [idCourse]);
  return (
    <div className="mt-2">
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          gap: "10px",
        }}
      >
        <button className="main__btn" onClick={handleSubmit(onSubmit)}>
          Cập nhật
        </button>
        <button className="main__btn">Hủy</button>
      </div>
      {loading ? (
        <Loading />
      ) : (
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
                    handleChangeAvatar(e.target.files[0]);
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
                  isDisabled={true}
                />
                {errors.category && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
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
                  onChangeOption={(e) => {
                    if (e.value === true) {
                      setValue("price", 0);
                    }
                  }}
                />
                {errors.isPublic && (
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

                {errors.language && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
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
      )}
    </div>
  );
}
