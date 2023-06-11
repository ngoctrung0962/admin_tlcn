import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SunEditor from "suneditor-react";
import uploadFileApi from "../../../../api/uploadFileApi";
import { Enums } from "../../../../utils/Enums";
import { useRef } from "react";
import MUIAddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";

const optionsTypeLecture = [
  {
    value: "VIDEO",
    label: "Video",
  },
  {
    value: "PRESENTATION",
    label: "Tài liệu",
  },
  {
    value: "QUIZ",
    label: "Bài kiểm tra",
  },
];
export default function ModalAddLecture({
  setIsShowModal,
  listContentCourseData,
  setListContentCourseData,
  dataEditLecture,
  setDataEditLecture,
  hanleExitModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: dataEditLecture,
  });
  console.log(dataEditLecture);
  const onSubmit = (data) => {
    if (dataEditLecture) {
      handleEdit(data);
    } else {
      hanleAdd(data);
    }
  };

  const handleEdit = (data) => {
    const newListChapter = listContentCourseData.map((chapter) => {
      if (chapter.id === data.id) {
        return {
          ...chapter,
          name: data.name,
        };
      }
      return chapter;
    });

    setListContentCourseData(newListChapter);
    reset();
    hanleExitModal();
  };
  const hanleAdd = (data) => {
    const newChapter = {
      id: listContentCourseData.length + 1,
      name: data.name,
      listLecture: [],
    };
    setListContentCourseData([...listContentCourseData, newChapter]);
    reset();
    setIsShowModal();
  };

  const handleUploadImageBefore = async (files, info, uploadHandler) => {
    // uploadHandler(files);
    console.log("handleUploadImageBefore", uploadHandler);
    console.log("info", info);
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

  const [typeLecture, setTypeLecture] = useState(Enums.typeLecture.VIDEO);
  const buttonChooseFile = useRef();

  const hanleUploadVideo = async (files) => {
  }
  return (
    <Modal
      show="true"
      centered
      size="lg"
      onHide={() => {
        hanleExitModal();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {dataEditLecture ? "Chỉnh sửa bài học" : "Thêm mới bài học"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Tên bài học</Form.Label>
            <Form.Control
              type="text"
              {...register("title", { required: true })}
            />
            {errors.title && <p className="form__error">Vui lòng nhập</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Loại bài học</Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register("lecture_type", { required: true })}
              onChange={(e) => {
                setTypeLecture(e.target.value);
              }}
            >
              {optionsTypeLecture.map((option) => {
                return <option value={option.value}>{option.label}</option>;
              })}
            </Form.Select>
            {errors.lecture_type && (
              <p className="form__error">Vui lòng nhập</p>
            )}
          </Form.Group>

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

          {typeLecture === Enums.typeLecture.VIDEO && (
            <Form.Group className="mb-3 d-flex justify-content-center flex-column">
              <Form.Label>Video bài học</Form.Label>
              <Form.Control
                hidden
                accept="video/*"
                type="file"
                ref={buttonChooseFile}
                onChange={(e) => {
                  console.log("log", e.target.files[0]);
                  // setValue("avatarFile", e.target.files);
                }}
                // {...register("videoFile", { required: true })}
              />
              <video
                src={
                  watch("videoFile")?.[0]
                    ? URL.createObjectURL(watch("videoFile")[0])
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
                    Tải lên video
                  </p>
                </Fab>
              </div>

              {errors.avatar && <p className="form__error">Vui lòng nhập</p>}
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleSubmit(onSubmit)}>
          {dataEditLecture ? "Cập nhật" : "Thêm mới"}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
