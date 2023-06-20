import React from "react";
import "./chapter.css";
import { GrDocumentText } from "react-icons/gr";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Lecture from "../Lecture/Lecture";
const Chapter = ({ chapter }) => {
  const listLecture = [
    {
      id: 1,
      lectureName: "Lecture 1",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    },
  ];
  return (
    <div className="chapter__container">
      <div className="chapter__tool">
        <div className="chapter__name">
          <h3>
            <span className="pe-3">
              <GrDocumentText />
            </span>{" "}
            Chapter: {chapter.chapterName}
          </h3>
        </div>
        <div className="chapter__action">
          <button className="btn btn-save">
            <AiOutlineDelete />
          </button>
          <button className="btn btn-save">
            <AiOutlineEdit />
          </button>
        </div>
      </div>
      <div className="chapter__content">
        {listLecture.map((lecture) => {
          return <Lecture lecture={lecture} />;
        })}
      </div>
    </div>
  );
};

export default Chapter;
