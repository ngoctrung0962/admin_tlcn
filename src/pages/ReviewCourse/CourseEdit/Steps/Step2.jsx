import React from "react";
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
  console.log(listContentCourseData);
  const handleAddChapter = () => {
    setIsShowModal(true);
  };

  const handleDeleteChapter = (id) => {
    const newListChapter = listContentCourseData.filter((chapter) => {
      return chapter.id !== id;
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

  const handleEditLecture = (lecture) => {
    setDataEditLecture(lecture);
    setIsShowModalLecture(true);
  };

  const [chapterId, setChapterId] = useState();
  const handleAddLecture = (chapterId) => {
    setChapterId(chapterId);
    setIsShowModalLecture(true);
  };

  const handleDeleteLecture = (id) => {
    const newListLecture = listContentCourseData.map((chapter) => {
      if (chapter.id === id) {
        return {
          ...chapter,
          listLecture: chapter.listLecture.filter((lecture) => {
            return lecture.id !== id;
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
    // Xử lý dữ liệu
    listContentCourseData.forEach((chapter, index) => {
      chapter.offset = index;
      chapter?.lectures?.forEach((lecture, indexLecture) => {
        delete lecture.id;
        lecture.offset = indexLecture;
      });
      delete chapter.id;
    });
    let dataPost = {
      sessionId: dataCourseTemp?.id,
      chapters: listContentCourseData,
    };
    console.log(dataPost);
    try {
      const res = await coursesApi.submitContent(dataPost);
      if (res.errorCode == "") {
        setDataCourseTemp(res.data);
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {}
  };

  const renderLecture = (lecture) => {
    return (
      <div className="lecture__box" key={lecture?.id}>
        <div className="lecture__head">
          <div className="lecture__name">
            <p className="">Tiêu đề: {lecture?.title}</p>
          </div>

          <Dropdown>
            <MenuItem onClick={() => handleEditLecture(lecture)}>
              <AiFillEye className="me-1" />
              Chỉnh sửa
            </MenuItem>
            <MenuItem onClick={() => handleDeleteLecture(lecture.id)}>
              <AiFillDelete className="me-1" />
              Xóa
            </MenuItem>
          </Dropdown>
        </div>
        <div className="lecture__body">
          <div className="lecture__info">
            <p className="lecture__summary">Tóm tắt: {lecture?.summary}</p>
            <p
              dangerouslySetInnerHTML={
                lecture?.description
                  ? { __html: "Mô tả: " + lecture?.description }
                  : { __html: "Không có mô tả" }
              }
              className="lecture__description"
            ></p>

            {lecture?.lectureType === Enums.typeLecture.VIDEO && (
              <video src={lecture?.link} controls className="lecture__video" />
            )}
            {lecture?.lectureType === Enums.typeLecture.PRESENTATION &&
              (lecture?.type === Enums.typePresentation.TEXT ? (
                <div className="lecture__content">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: "Nội dung: " + lecture?.content,
                    }}
                  ></p>
                </div>
              ) : (
                <div className="lecture__doc">
                  <DocViewer
                    documents={[
                      {
                        uri: lecture?.link,
                      },
                    ]}
                    pluginRenderers={DocViewerRenderers}
                    // config={{
                    //     header: {
                    //         //disableHeader: false,
                    //         disableFileName: true,
                    //         retainURLParams: false,
                    //     },
                    // }}
                    prefetchMethod="GET"
                    requestHeaders={{
                      Origin: "http://localhost:3000",
                      //"My-Custom-Header": "my-custom-value",
                    }}
                    disableFilename={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}
            {lecture?.lectureType === Enums.typeLecture.QUIZ && (
              <div className="lecture__content">
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
  return (
    <div>
      <div className="btn__add__chapter mb-2">
        <button className="" onClick={handleAddChapter}>
          <i className="fas fa-plus"></i>
          Thêm Chapter
        </button>
      </div>
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
                <MenuItem onClick={() => handleDeleteChapter(chapter.id)}>
                  <AiFillDelete className="me-1" />
                  Xóa
                </MenuItem>
              </Dropdown>
            </div>
            <div className="chapter__body">
              <div className="btn__add__chapter mb-2">
                <button
                  className=""
                  onClick={() => handleAddLecture(chapter?.id)}
                >
                  <i className="fas fa-plus"></i>
                  Thêm bài học
                </button>
              </div>
              {chapter?.lectures?.map((lecture, indexLecture) => {
                return (
                  // <div className="lecture__box" key={indexLecture}>
                  //   <div className="lecture__head">
                  //     <h5 className="lecture__name">{lecture.name} </h5>
                  //     <Dropdown>
                  //       <MenuItem onClick={() => handleEditLecture(lecture)}>
                  //         <AiFillEye className="me-1" />
                  //         Chỉnh sửa
                  //       </MenuItem>
                  //       <MenuItem
                  //         onClick={() => handleDeleteLecture(lecture.id)}
                  //       >
                  //         <AiFillDelete className="me-1" />
                  //         Xóa
                  //       </MenuItem>
                  //     </Dropdown>
                  //   </div>
                  //   <div className="lecture__body">
                  //     <div className="lecture__info">
                  //       <span className="lecture__time">
                  //         {lecture.time} phút
                  //       </span>
                  //     </div>
                  //   </div>
                  // </div>
                  renderLecture(lecture)
                );
              })}
            </div>
          </div>
        );
      })}

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
