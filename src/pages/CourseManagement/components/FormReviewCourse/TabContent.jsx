import React, { useEffect, useState } from "react";
import { Enums } from "../../../../utils/Enums";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Dropdown from "../../../../components/Dropdown/Dropdown.component";
import { MenuItem } from "@mui/material";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import chapterApi from "../../../../api/chapterApi";
import Loading from "../../../../components/Loading/Loading.component";
import ModalAddChapter from "../ModalAddChapter/ModalAddChapter";
import ModalAddLecture from "../ModalAddLecture/ModalAddLecture";
import Swal from "sweetalert2";

export default function TabContent({ idCourse }) {
  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState();
  const fetchDataContent = async () => {
    setLoading(true);
    try {
      const res = await chapterApi.getbycourseId(idCourse);
      if (!res.errorCode) {
        setContent(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const [dataEditChapter, setDataEditChapter] = useState();
  const [isShowModalChapter, setIsShowModalChapter] = useState(false);
  const hanleExitModalChapter = () => {
    setIsShowModalChapter(false);
    setDataEditChapter(null);
  };
  const handleEditChapter = (chapter) => {
    setDataEditChapter(chapter);
    setIsShowModalChapter(true);
  };
  const handleDeleteChapter = async (idChapter) => {
    try {
      const res = await chapterApi.teacherDeleteChapter(idChapter);
      if (!res.errorCode) {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Xóa thành công",
        });
        fetchDataContent();
      } else {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Xóa thất bại",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isShowModalLecture, setIsShowModalLecture] = useState(false);
  const [dataEditLecture, setDataEditLecture] = useState();
  const hanleExitModalLecture = () => {
    setIsShowModalLecture(false);
    setDataEditLecture(null);
  };

  const handleEditLecture = (lecture) => {
    setDataEditLecture(lecture);
    setIsShowModalLecture(true);
  };

  const renderLecture = (lecture, chapter) => {
    return (
      <div className="lecture__box" key={lecture?.temp_id}>
        <div className="lecture__head">
          <div className="lecture__name">
            <p className="">Tiêu đề: {lecture?.title}</p>
          </div>

          <Dropdown>
            <MenuItem onClick={() => handleEditLecture(lecture)}>
              <AiFillEye className="me-1" />
              Chỉnh sửa
            </MenuItem>
            <MenuItem>
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
    fetchDataContent();
  }, [idCourse]);
  return (
    <div className="mt-2">
      {isShowModalChapter && (
        <ModalAddChapter
          dataEditChapter={dataEditChapter}
          setDataEditChapter={setDataEditChapter}
          hanleExitModal={hanleExitModalChapter}
          fetchData={fetchDataContent}
        />
      )}

      {isShowModalLecture && (
        <ModalAddLecture
          dataEditLecture={dataEditLecture}
          setDataEditLecture={setDataEditLecture}
          hanleExitModal={hanleExitModalLecture}
          fetchData={fetchDataContent}
        />
      )}

      {loading ? (
        <Loading />
      ) : (
        // Sắp xếp mảng chapter theo offset
        content
          ?.sort((a, b) => a.offset - b.offset)
          .map((chapter, index) => {
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
                  {chapter?.lectures
                    ?.sort((a, b) => a.offset - b.offset)
                    .map((lecture, indexLecture) => {
                      return renderLecture(lecture, chapter);
                    })}
                  <div className="btn__add__chapter">
                    <button
                      className=""
                      onClick={() => {
                        setIsShowModalLecture(true);
                      }}
                    >
                      <i className="fas fa-plus"></i>
                      Thêm bài học
                    </button>
                  </div>
                </div>
              </div>
            );
          })
      )}
      <div className="btn__add__chapter">
        <button
          className=""
          onClick={() => {
            setIsShowModalChapter(true);
          }}
        >
          <i className="fas fa-plus"></i>
          Add Chapter
        </button>
      </div>
    </div>
  );
}
