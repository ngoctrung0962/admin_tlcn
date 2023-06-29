import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SunEditor from "suneditor-react";
import uploadFileApi from "../../../../api/uploadFileApi";
import { Enums } from "../../../../utils/Enums";
import { useRef } from "react";
import MUIAddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import lectureApi from "../../../../api/lectureApi";
import Swal from "sweetalert2";
import ModalQuestion from "../ModalQuestion/ModalQuestion";
import ModalOption from "../ModalOption/ModalOption";

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

const optionsTypePRESENTATION = [
  {
    value: "TEXT",
    label: "TEXT",
  },
  {
    value: "FILE",
    label: "FILE",
  },
];
export default function ModalAddLecture({
  dataEditLecture,
  hanleExitModal,
  fetchData,
  chapterIdProp,
}) {
  const [loading, setLoading] = useState(false);

  console.log("dataEditLecture", dataEditLecture);
  const [isEdit, setIsEdit] = useState(dataEditLecture ? true : false);
  const [typeLecture, setTypeLecture] = useState(
    dataEditLecture ? dataEditLecture?.lectureType : Enums.typeLecture.VIDEO
  );
  const [typePresentation, setTypePresentation] = useState(
    dataEditLecture ? dataEditLecture?.type : Enums.typePresentation.TEXT
  );
  const findDefaultValueByLectureType = (lectureType) => {
    switch (lectureType) {
      case Enums.typeLecture.VIDEO:
        return {
          id: dataEditLecture?.id,
          title: dataEditLecture?.title,
          lectureType: dataEditLecture?.lectureType,
          description: dataEditLecture?.description,
          link: dataEditLecture?.link,
          offset: Number(dataEditLecture?.offset),
          chapterId: dataEditLecture?.chapterId,
        };
      case Enums.typeLecture.PRESENTATION:
        return {
          id: dataEditLecture?.id,
          title: dataEditLecture?.title,
          lectureType: dataEditLecture?.lectureType,
          description: dataEditLecture?.description,
          type: dataEditLecture?.type,
          content: dataEditLecture?.content,
          link: dataEditLecture?.link,
          offset: Number(dataEditLecture?.offset),
          chapterId: dataEditLecture?.chapterId,
        };
      case Enums.typeLecture.QUIZ:
        return {
          id: dataEditLecture?.id,
          title: dataEditLecture?.title,
          lectureType: dataEditLecture?.lectureType,
          description: dataEditLecture?.description,
          numToPass: dataEditLecture?.numToPass,
          summary: dataEditLecture?.summary,
          offset: Number(dataEditLecture?.offset),
          chapterId: dataEditLecture?.chapterId,
          questions: dataEditLecture?.questions,
        };
      default:
        return {};
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues:
      //  Xử lí default value ở đây
      dataEditLecture
        ? findDefaultValueByLectureType(dataEditLecture?.lectureType)
        : {},
  });

  const onSubmit = (data) => {
    data.offset = Number(data.offset);

    if (isEdit) {
      handleEdit(data);
    } else {
      handleAdd(data);
    }
  };

  const handleEdit = async (data) => {
    setLoading(true);
    if (data.lectureType === Enums.typeLecture.QUIZ) {
      // xóa temp_id
      data.questions = listDataQuiz.map((question) => {
        const newOptions = question.options.map((option) => {
          delete option.temp_id;
          return option;
        });
        delete question.temp_id;
        return {
          ...question,
          options: newOptions,
        };
      });
    }
    console.log("data", data);
    try {
      const res = await lectureApi.teacherUpdateLecture(data);
      if (res.errorCode == "") {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Cập nhật thành công",
        });
        fetchData();
        reset();
        hanleExitModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Cập nhật thất bại",
        });
      }
    } catch (error) {}
    setLoading(false);
  };

  const handleAdd = async (data) => {
    data.chapterId = chapterIdProp;
    // Nếu là loại bài học quiz thì thêm 1 field questions
    if (data.lectureType === Enums.typeLecture.QUIZ) {
      // xóa temp_id
      data.questions = listDataQuiz.map((question) => {
        const newOptions = question.options.map((option) => {
          delete option.temp_id;
          return option;
        });
        delete question.temp_id;
        return {
          ...question,
          options: newOptions,
        };
      });
    }
    console.log("data", data);
    setLoading(true);
    try {
      const res = await lectureApi.teacherAddLecture(data);
      if (res.errorCode == "") {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Thêm mới thành công",
        });
        fetchData();
        reset();
        hanleExitModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Thêm mới thất bại",
        });
      }
    } catch (error) {}
    setLoading(false);
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
    // Thay đổi đường dẫn ảnh
    // targetImgElement.src = imageInfo.src;
  };

  const buttonChooseFile = useRef();

  const hanleUploadFile = async (files) => {
    try {
      const formData = new FormData();
      formData.append("files", files);
      const res = await uploadFileApi.upLoadFile(formData);
      if (res.errorCode == "") {
        setValue("link", res.data[0]);
      }
    } catch (error) {}
  };

  // Xử lí phần nếu lectureType là Quiz
  const [listDataQuiz, setListDataQuiz] = useState(
    // [
    //   {
    //     id: 1,
    //     content: "what is docker?",
    //     questionType: "CHOICE_ONE",
    //     options: [
    //       {
    //         id: 1,
    //         content: "Docker is helpful",
    //         isCorrect: true,
    //         whyCorrect: "Docker is used to deploy easy than normal",
    //       },
    //       {
    //         id: 2,
    //         content: "Docker is a open source",
    //         isCorrect: false,
    //         whyCorrect: null,
    //       },
    //     ],
    //   },
    //   {
    //     id: 2,
    //     content: "what is docker?",
    //     questionType: "MULTIPLE_CHOICE",
    //     options: [
    //       {
    //         id: 1,
    //         content: "Docker is helpful",
    //         isCorrect: true,
    //         whyCorrect: "Docker is used to deploy easy than normal",
    //       },
    //       {
    //         id: 2,
    //         content: "Docker is a open source",
    //         isCorrect: false,
    //         whyCorrect: "Docker is used to deploy easy than normal",
    //       },
    //       {
    //         id: 3,
    //         content: "Docker is helpful",
    //         isCorrect: true,
    //         whyCorrect: "Docker is used to deploy easy than normal",
    //       },
    //     ],
    //   },
    // ]

    dataEditLecture?.questions ? dataEditLecture?.questions : []
  );

  // question
  const [isShowModalQuestion, setIsShowModalQuestion] = useState(false);
  const [dataEditQuestion, setDataEditQuestion] = useState();
  const hanleExitModalQuestion = () => {
    setIsShowModalQuestion(false);
    setDataEditQuestion(null);
  };

  // option
  const [isShowModalOption, setIsShowModalOption] = useState(false);
  const [dataEditOption, setDataEditOption] = useState();
  const hanleExitModalOption = () => {
    setIsShowModalOption(false);
    setDataEditOption(null);
  };
  const [questionId, setQuestionId] = useState();

  const handleDeleteQuestion = (questionId) => {
    const newListQuestion = listDataQuiz.filter(
      (question) => question.temp_id !== questionId
    );
    setListDataQuiz(newListQuestion);
  };

  const handleDeleteOption = (optionId, questionId) => {
    const newListQuestion = listDataQuiz.map((question) => {
      if (question.temp_id === questionId) {
        const newOptions = question.options.filter(
          (option) => option.temp_id !== optionId
        );
        return {
          ...question,
          options: newOptions,
        };
      }
      return question;
    });
    setListDataQuiz(newListQuestion);
  };

  useEffect(() => {
    if (listDataQuiz.length > 0) {
      // gán lại temp_id cho chapter và lecture băng filed id
      listDataQuiz?.forEach((question, index) => {
        question.temp_id = question.id;
        question?.options?.forEach((option, indexLecture) => {
          option.temp_id = option.id;
        });
      });
    }
  }, []);
  return (
    <>
      {isShowModalQuestion && (
        <ModalQuestion
          dataEditQuestion={dataEditQuestion}
          hanleExitModal={hanleExitModalQuestion}
          listDataQuiz={listDataQuiz}
          setListDataQuiz={setListDataQuiz}
        />
      )}
      {isShowModalOption && (
        <ModalOption
          dataEditOption={dataEditOption}
          hanleExitModal={hanleExitModalOption}
          listDataQuiz={listDataQuiz}
          setListDataQuiz={setListDataQuiz}
          questionId={questionId}
        />
      )}
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
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
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
                {...register("lectureType", { required: true })}
                onChange={(e) => {
                  setTypeLecture(e.target.value);
                }}
                disabled={dataEditLecture ? true : false}
              >
                {optionsTypeLecture.map((option) => {
                  return <option value={option.value}>{option.label}</option>;
                })}
              </Form.Select>
              {errors.lectureType && (
                <p className="form__error">Vui lòng nhập</p>
              )}
            </Form.Group>
            {typeLecture !== Enums.typeLecture.QUIZ && (
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
            )}

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
                    hanleUploadFile(e.target.files[0]);
                  }}
                />
                <video
                  src={watch("link") && getValues("link")}
                  alt="link video"
                  style={{
                    height: "auto",
                    width: "350px",
                    display: "block",
                    padding: "10px",
                    background: "gray",
                    borderRadius: "10px",
                    margin: "0 auto",
                  }}
                  controls
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
                    disabled={dataEditLecture ? true : false}
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

            {typeLecture === Enums.typeLecture.PRESENTATION && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Loại tài liệu</Form.Label>
                  <Form.Select
                    {...register("type", { required: true })}
                    onChange={(e) => {
                      setTypePresentation(e.target.value);
                    }}
                    disabled={dataEditLecture ? true : false}
                  >
                    {optionsTypePRESENTATION.map((option) => {
                      return (
                        <option value={option.value}>{option.label}</option>
                      );
                    })}
                  </Form.Select>
                  {errors.type && <p className="form__error">Vui lòng nhập</p>}
                </Form.Group>

                {typePresentation === Enums.typePresentation.TEXT && (
                  <Form.Group className="mb-3">
                    <Form.Label>Nội dung</Form.Label>
                    <Form.Control
                      // type="text"
                      as="textarea"
                      rows={4}
                      {...register("content", { required: true })}
                    />
                    {errors.content && (
                      <p className="form__error">Vui lòng nhập</p>
                    )}
                  </Form.Group>
                )}

                {typePresentation === Enums.typePresentation.FILE && (
                  <div>
                    <Form.Group className="mb-3 d-flex justify-content-center flex-column">
                      <Form.Label>File bài học</Form.Label>
                      <Form.Control
                        accept="*"
                        type="file"
                        onChange={(e) => {
                          hanleUploadFile(e.target.files[0]);
                        }}
                        disabled={dataEditLecture ? true : false}
                      />
                    </Form.Group>
                    {dataEditLecture && (
                      <div className="lecture__doc">
                        <DocViewer
                          documents={[
                            {
                              uri: dataEditLecture?.link,
                            },
                          ]}
                          pluginRenderers={DocViewerRenderers}
                          prefetchMethod="GET"
                          requestHeaders={{
                            Origin: "http://localhost:3000",
                            //"My-Custom-Header": "my-custom-value",
                          }}
                          disableFilename={true}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {typeLecture === Enums.typeLecture.QUIZ && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Số câu vượt qua tối thiểu</Form.Label>
                  <Form.Control
                    type="number"
                    {...register("numToPass", { required: true })}
                  />
                  {errors.numToPass && (
                    <p className="form__error">Vui lòng nhập</p>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tóm tắt</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("summary", { required: true })}
                  />
                  {errors.summary && (
                    <p className="form__error">Vui lòng nhập</p>
                  )}
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Thứ tự</Form.Label>
              <Form.Control
                type="number"
                {...register("offset", {
                  required: true,
                  min: 1,
                })}
              />
              {errors.offset?.type === "required" && (
                <p className="form__error">Vui lòng nhập</p>
              )}
              {errors.offset?.type === "min" && (
                <p className="form__error">Vui lòng nhập số lớn hơn 0</p>
              )}
            </Form.Group>

            {typeLecture === Enums.typeLecture.QUIZ && (
              <div>
                {/* list questions */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="">Danh sách câu hỏi</h5>
                </div>

                <div className="list__question ">
                  {listDataQuiz.map((item, index) => {
                    return (
                      <div className="question__item">
                        <div className="question__item__header">
                          <p className="question__item__header__name">
                            Câu hỏi {index + 1}: {item?.content}{" "}
                            {item?.questionType == "CHOICE_ONE"
                              ? "(1 câu trả lời)"
                              : "(nhiều câu trả lời)"}
                          </p>
                          <div className="d-flex">
                            <button
                              className="btn btn-primary me-2 btn__of__question"
                              type="button"
                              onClick={() => {
                                setQuestionId(item?.temp_id);
                                setIsShowModalOption(true);
                              }}
                            >
                              Thêm lựa chọn
                            </button>
                            <button
                              className="btn btn-primary me-2  btn__of__question"
                              type="button"
                              onClick={() => {
                                setDataEditQuestion(item);
                                setIsShowModalQuestion(true);
                              }}
                            >
                              {/* Chỉnh sửa */}
                              <i className="fas fa-edit "></i>
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteQuestion(item?.temp_id);
                              }}
                              className="btn btn-danger  btn__of__question"
                              type="button"
                            >
                              {/* Xóa */}
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                        <div className="question__item__body">
                          {item?.options?.map((option, index) => {
                            return (
                              <div className="option__item">
                                <div className="option__head d-flex justify-content-between align-items-center">
                                  <p className="option__content">
                                    Lựa chọn: {index + 1}: {option?.content}
                                  </p>

                                  <div className="d-flex">
                                    <button
                                      className="btn btn-primary me-2  btn__of__question "
                                      type="button"
                                      onClick={() => {
                                        setDataEditOption(option);
                                        setIsShowModalOption(true);
                                        setQuestionId(item?.temp_id);
                                      }}
                                    >
                                      {/* Chỉnh sửa */}
                                      <i className="fas fa-edit "></i>
                                    </button>
                                    <button
                                      onClick={() => {
                                        handleDeleteOption(
                                          option?.temp_id,
                                          item?.temp_id
                                        );
                                      }}
                                      className="btn btn-danger  btn__of__question"
                                      type="button"
                                    >
                                      {/* Xóa */}
                                      <i className="fas fa-trash-alt"></i>
                                    </button>
                                  </div>
                                </div>
                                <div className="option__body"></div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="question__item__footer">
                          <p className="m-0 p-0">
                            {/* Câu trả lời đúng + lý do */}
                            Câu trả lời đúng:{" "}
                            {item?.options
                              ?.filter((option) => option?.isCorrect)
                              ?.map((option) => {
                                return (
                                  <div className="option__content">
                                    {option?.content}
                                    <p className="option__whycorrect">
                                      ( Lý do: {option?.whyCorrect} )
                                    </p>
                                  </div>
                                );
                              })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="btn btn-primary  btn__of__question"
                  onClick={() => {
                    setIsShowModalQuestion(true);
                  }}
                  type="button"
                >
                  Thêm câu hỏi
                </button>
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary btn__footer__modal"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {dataEditLecture ? "Cập nhật" : "Thêm mới"}
            {loading && (
              <span
                className="spinner-border spinner-border-sm ms-2"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
