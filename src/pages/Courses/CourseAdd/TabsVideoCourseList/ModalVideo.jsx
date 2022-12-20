import { Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import chapterApi from "../../../../api/chapterApi";
import SimpleSelect from "../../../../components/Select/SimpleSelect";
import MUIAddIcon from "@mui/icons-material/Add";
import SelectChapterByCourseAsync from "../../../../components/Select/SelectChapterByCourseAsync";
import videocoursesApi from "../../../../api/videocoursesApi";
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading/Loading.component";

export default function ModalVideo({
  editRow,
  showModal,
  setShowModal,
  listchapters,
  onHide,
  setEditRow,
  listVideos,
}) {
  const { currentUser } = useSelector((state) => state.user);
  const isEdit = editRow;
  console.log("isEdit", isEdit);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: isEdit ? editRow : null,
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const onSubmit = async (data) => {
    const chapterId = data.chapterId;
    //Xóa chapterId khỏi data
    delete data.chapterId;
    data.video = data.videoFile?.[0];
    delete data.videoFile;
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    //log form data
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    if (isEdit) {
      const dataPUT = {
        title: data.title,
        description: data.description,
        nextVideoId: data.nextVideoId,
      };
      await handleEdit(data, dataPUT);
    } else {
      await handleAdd(chapterId, formData);
    }
    reset();
    onHide();
  };
  const handleEdit = async (data) => {
    const res = await videocoursesApi.update(data.id, data);
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Sửa thành công",
        showConfirmButton: false,
      });
      setEditRow(null);
    } else {
      Swal.fire({
        icon: "error",
        title: "Sửa thất bại",
        showConfirmButton: false,
      });
    }
  };
  const handleAdd = async (chapterId, data) => {
    const res = await videocoursesApi.uploadvideo(
      currentUser.username,
      id,
      chapterId,
      data
    );
    if (res.errorCode === "") {
      Swal.fire({
        icon: "success",
        title: "Thêm thành công",
        showConfirmButton: false,
      });
      setEditRow(res.data);
    } else {
      Swal.fire({
        icon: "error",
        title: "Thêm thất bại",
        showConfirmButton: false,
      });
    }
  };

  const buttonChooseFile = useRef();

  // Xử lí thứ tự video trong chapter
  const [pickerChapter, setPickerChapter] = useState();
  const [listVideoOption, setListVideoOption] = useState([]);
  console.log("pickerChapter", pickerChapter);
  useEffect(() => {
    const fetchVideoOfChapter = async () => {
      const res = await videocoursesApi.getbychapter(
        isEdit ? isEdit.chapterId : pickerChapter
      );
      console.log("fetch", res);
      setListVideoOption(res.data);
    };
    fetchVideoOfChapter();
  }, [pickerChapter]);
  const listOptions = listVideoOption
    ? listVideoOption?.concat({
        id: -1,
        chapterName: "Cuối chapter",
      })
    : [
        {
          id: -1,
          chapterName: "Cuối chapter",
        },
      ];
  return loading ? (
    <Loading />
  ) : (
    <Modal
      show="true"
      size="lg"
      centered
      onHide={() => {
        onHide();
        reset();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thêm mới Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form */}
        <Form className="container" onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col md={6} sm={12}>
              <Form.Group className="mb-3 d-flex justify-content-center flex-column">
                <Form.Label>Video</Form.Label>
                <Form.Control
                  hidden
                  accept="video/*"
                  type="file"
                  ref={buttonChooseFile}
                  onChange={(e) => {
                    setValue("videoFile", e.target.files);
                  }}
                />
                <video
                  src={
                    watch("videoFile")?.[0]
                      ? URL.createObjectURL(watch("videoFile")[0])
                      : getValues("videoFile") ||
                        require("../../../../assets/images/default-image.jpg")
                  }
                  alt="video"
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
                      backgroundColor: "#005fb7",
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
                    disabled={isEdit ? true : false}
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

                {errors.video && <p className="form__error">Vui lòng nhập</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tiêu đề video</Form.Label>
                <Form.Control
                  type="text"
                  {...register("title", { required: true })}
                />
                {errors.title && <p className="form__error">Vui lòng nhập</p>}
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Chapter</Form.Label>
                <SimpleSelect
                  isDisabled={isEdit ? true : false}
                  control={control}
                  field={"chapterId"}
                  placeholder="Chọn chapter"
                  options={listchapters?.map((item) => {
                    return {
                      value: item.id,
                      label: item.chapterName,
                    };
                  })}
                  onChangeOption={(value) => {
                    setPickerChapter(value.value);
                  }}
                />
                {errors.chapterId && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Thứ tự trong chapter(*)</Form.Label>
                <SimpleSelect
                  control={control}
                  required={true}
                  field={"nextVideoId"}
                  placeholder="Chọn thứ tự"
                  options={
                    listOptions
                      ?.map((item) => {
                        return {
                          value: item.id,
                          label:
                            item.id !== -1
                              ? "Trước " + item.title
                              : item.chapterName,
                        };
                      })
                      .filter((item) => item.value !== isEdit?.id) || []
                  }
                />
                {errors.nextChapterId && (
                  <Form.Label className="error">Vui lòng chọn</Form.Label>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  style={{}}
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <p className="form__error">Vui lòng nhập</p>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? "Đang lưu..." : "Lưu"}
        </Button>
        <Button onClick={onHide} disabled={isSubmitting}>
          Hủy
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
