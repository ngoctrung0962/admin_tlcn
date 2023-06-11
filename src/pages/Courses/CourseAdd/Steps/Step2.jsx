import React from "react";
import { useState } from "react";
import ModalAddChapter from "../ModalAddChapter/ModalAddChapter";
import Dropdown from "../../../../components/Dropdown/Dropdown.component";
import { MenuItem } from "@mui/material";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiHistory } from "react-icons/bi";
import ModalAddLecture from "../ModalAddLecture/ModalAddLecture";

export default function Step2({ currentStep, setCurrentStep }) {
  const [listContentCourseData, setListContentCourseData] = useState([
    {
      id: 1,
      name: "Chapter 1",
      listLecture: [
        {
          id: 1,
          name: "Lecture 1",
          video: "",
          time: "",
        },
        {
          id: 2,
          name: "Lecture 2",
          video: "",
          time: "",
        },
      ],
    },
    {
      id: 2,
      name: "Chapter 2",
      listLecture: [],
    },
    {
      id: 3,
      name: "Chapter 3",
      listLecture: [],
    },
  ]);

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

  const handleAddLecture = () => {
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
        />
      )}
      {listContentCourseData.map((chapter, index) => {
        return (
          <div className="chapter__box" key={index}>
            <div className="chapter__head">
              <h5 className="chapter__name">{chapter.name}</h5>

              {/* <div className="chapter__tool gap-3">
                <button className="chapter__btn">
                  <i className="fas fa-plus"></i>
                </button>
                <button
                  className="chapter__btn"
                  onClick={() => handleDeleteChapter(chapter.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div> */}
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
              {chapter?.listLecture?.map((lecture, indexLecture) => {
                return (
                  <div className="lecture__box" key={indexLecture}>
                    <div className="lecture__head">
                      <h5 className="lecture__name">{lecture.name}</h5>
                      <Dropdown>
                        <MenuItem onClick={() => handleEditLecture(lecture)}>
                          <AiFillEye className="me-1" />
                          Chỉnh sửa
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDeleteLecture(lecture.id)}
                        >
                          <AiFillDelete className="me-1" />
                          Xóa
                        </MenuItem>
                      </Dropdown>
                    </div>
                    <div className="lecture__body">
                      <div className="lecture__info">
                        <span className="lecture__time">
                          {lecture.time} phút
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="btn__add__chapter" onClick={handleAddLecture}>
                <button className="">
                  <i className="fas fa-plus"></i>
                  Thêm bài học
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="btn__add__chapter" onClick={handleAddChapter}>
        <button className="">
          <i className="fas fa-plus"></i>
          Add Chapter
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          gap: "10px",
        }}
      >
        <button
          className="main__btn"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Prev
        </button>

        <button
          className="main__btn"
          onClick={() => setCurrentStep(currentStep + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
