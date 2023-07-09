import React, { useEffect } from "react";
import { useState } from "react";
import ModalAddChapter from "../ModalAddChapter/ModalAddChapter";
import Dropdown from "../../../../components/Dropdown/Dropdown.component";
import { MenuItem } from "@mui/material";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import ModalAddLecture from "../ModalAddLecture/ModalAddLecture";
import { Enums } from "../../../../utils/Enums";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import coursesApi from "../../../../api/coursesApi";

export default function Step2({
  currentStep,
  setCurrentStep,
  dataCourseTemp,
  setDataCourseTemp,
}) {
  const [listContentCourseData, setListContentCourseData] = useState(
    dataCourseTemp?.content ? dataCourseTemp?.content : []
  );
  console.log("listContentCourseData", listContentCourseData);
  const handleAddChapter = () => {
    setIsShowModal(true);
  };

  const handleDeleteChapter = (temp_id) => {
    const newListChapter = listContentCourseData.filter((chapter) => {
      return chapter.temp_id !== temp_id;
    });
    setListContentCourseData(newListChapter);
  };

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalLecture, setIsShowModalLecture] = useState(false);
  const [dataEditChapter, setDataEditChapter] = useState();

  const handleEditChapter = (chapter) => {
    setDataEditChapter(chapter);
    setIsShowModal(true);
  };

  const hanleExitModal = () => {
    setIsShowModal(false);
    setDataEditChapter(null);
  };

  const [dataEditLecture, setDataEditLecture] = useState();

  const handleEditLecture = (lecture, chapter) => {
    console.log(lecture);
    setDataEditLecture(lecture);
    setIsShowModalLecture(true);
    setChapterId(chapter.temp_id);
  };

  const [chapterId, setChapterId] = useState();
  const handleAddLecture = (chapterId) => {
    setChapterId(chapterId);
    setIsShowModalLecture(true);
  };

  const handleDeleteLecture = (temp_id, chapter) => {
    const newListLecture = listContentCourseData.map((chapter) => {
      if (chapter.temp_id === chapter.temp_id) {
        return {
          ...chapter,
          lectures: chapter.lectures.filter((lecture) => {
            return lecture.temp_id !== temp_id;
          }),
        };
      }
      return chapter;
    });
    setListContentCourseData(newListLecture);
  };

  const hanleExitModalLecture = () => {
    setIsShowModalLecture(false);
    setDataEditLecture(null);
  };

  const hanleSubtmit = async () => {
    // Nếu trạng thái là đã bị từ chối hoặc đợi duyệt thì chỉ next step
    if (
      dataCourseTemp?.status === Enums.STATUS_REGISTER_COURSE._REJECTED ||
      dataCourseTemp?.status ===
        Enums.STATUS_REGISTER_COURSE._WAITING_FOR_REVIEW ||
      dataCourseTemp?.status === Enums.STATUS_REGISTER_COURSE._APPROVED
    ) {
      setCurrentStep(currentStep + 1);
      return;
    }
    // Xử lý dữ liệu
    listContentCourseData.forEach((chapter, index) => {
      chapter.offset = index;
      chapter?.lectures?.forEach((lecture, indexLecture) => {
        delete lecture.temp_id;
        lecture.offset = indexLecture;
      });
      delete chapter.temp_id;
    });
    let dataPost = {
      sessionId: dataCourseTemp?.id,
      chapters: listContentCourseData,
    };
    try {
      const res = await coursesApi.submitContent(dataPost);
      if (res.errorCode == "") {
        setDataCourseTemp(res.data);
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {}
  };

  const renderLecture = (lecture, chapter) => {
    return (
      <div className="lecture__box" key={lecture?.temp_id}>
        <div className="lecture__head">
          <div className="lecture__name">
            <p className="">Tiêu đề: {lecture?.title}</p>
          </div>

          <Dropdown>
            <MenuItem onClick={() => handleEditLecture(lecture, chapter)}>
              <AiFillEye className="me-1" />
              Chỉnh sửa
            </MenuItem>
            <MenuItem
              onClick={() => handleDeleteLecture(lecture.temp_id, chapter)}
            >
              <AiFillDelete className="me-1" />
              Xóa
            </MenuItem>
          </Dropdown>
        </div>
        <div className="lecture__body">
          <div className="lecture__info">
            {lecture?.lectureType === Enums.typeLecture.VIDEO && (
              <>
                <video
                  src={lecture?.link}
                  controls
                  className="lecture__video"
                />
                <p
                  dangerouslySetInnerHTML={
                    lecture?.description
                      ? { __html: "Mô tả: " + lecture?.description }
                      : { __html: "Không có mô tả" }
                  }
                  className="lecture__description"
                ></p>
              </>
            )}
            {lecture?.lectureType === Enums.typeLecture.PRESENTATION &&
              (lecture?.type === Enums.typePresentation.TEXT ? (
                <div className="lecture__content">
                  <p
                    dangerouslySetInnerHTML={
                      lecture?.description
                        ? { __html: "Mô tả: " + lecture?.description }
                        : { __html: "Không có mô tả" }
                    }
                    className="lecture__description"
                  ></p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: "Nội dung: " + lecture?.content,
                    }}
                  ></p>
                </div>
              ) : (
                <div>
                  <p
                    dangerouslySetInnerHTML={
                      lecture?.description
                        ? { __html: "Mô tả: " + lecture?.description }
                        : { __html: "Không có mô tả" }
                    }
                    className="lecture__description"
                  ></p>
                  <div className="lecture__doc">
                    <DocViewer
                      documents={[
                        {
                          uri: lecture?.link,
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
                </div>
              ))}
            {lecture?.lectureType === Enums.typeLecture.QUIZ && (
              <div className="lecture__content">
                <p className="lecture__summary">Tóm tắt: {lecture?.summary}</p>

                <p className="lecture__numtopass">
                  Số câu vượt qua tối thiểu: {lecture?.numToPass}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (dataCourseTemp?.content) {
      // gán lại temp_id cho chapter và lecture băng filed id
      listContentCourseData.forEach((chapter, index) => {
        chapter.temp_id = chapter.id;
        chapter?.lectures?.forEach((lecture, indexLecture) => {
          lecture.temp_id = lecture.id;
        });
      });
    }
  }, []);
  return (
    <div>
      {isShowModal && (
        <ModalAddChapter
          setIsShowModal={setIsShowModal}
          listContentCourseData={listContentCourseData}
          setListContentCourseData={setListContentCourseData}
          dataEditChapter={dataEditChapter}
          setDataEditChapter={setDataEditChapter}
          hanleExitModal={hanleExitModal}
        />
      )}

      {isShowModalLecture && (
        <ModalAddLecture
          setIsShowModal={setIsShowModalLecture}
          listContentCourseData={listContentCourseData}
          setListContentCourseData={setListContentCourseData}
          dataEditLecture={dataEditLecture}
          setDataEditLecture={setDataEditLecture}
          hanleExitModal={hanleExitModalLecture}
          chapterId={chapterId}
        />
      )}
      <div
        style={{
          pointerEvents:
            dataCourseTemp?.status === Enums.STATUS_REGISTER_COURSE._REJECTED ||
            dataCourseTemp?.status ===
              Enums.STATUS_REGISTER_COURSE._WAITING_FOR_REVIEW ||
            dataCourseTemp?.status === Enums.STATUS_REGISTER_COURSE._APPROVED
              ? "none"
              : "auto",
        }}
      >
        {listContentCourseData.map((chapter, index) => {
          return (
            <div className="chapter__box" key={index}>
              <div className="chapter__head">
                <h5 className="chapter__name">
                  {" "}
                  Tên chapter: {" " + chapter.chapterName}
                </h5>

                <Dropdown>
                  <MenuItem onClick={() => handleEditChapter(chapter)}>
                    <AiFillEye className="me-1" />
                    Chỉnh sửa
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDeleteChapter(chapter.temp_id)}
                  >
                    <AiFillDelete className="me-1" />
                    Xóa
                  </MenuItem>
                </Dropdown>
              </div>
              <div className="chapter__body">
                {chapter?.lectures?.map((lecture, indexLecture) => {
                  return renderLecture(lecture, chapter);
                })}
                <div className="btn__add__chapter">
                  <button
                    className=""
                    onClick={() => handleAddLecture(chapter?.temp_id)}
                  >
                    <i className="fas fa-plus"></i>
                    Thêm bài học
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="btn__add__chapter">
          <button className="" onClick={handleAddChapter}>
            <i className="fas fa-plus"></i>
            Add Chapter
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          gap: "10px",
        }}
      >
        <button className="main__btn" onClick={() => hanleSubtmit()}>
          Next
        </button>
        <button
          className="main__btn"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Prev
        </button>
      </div>
    </div>
  );
}
