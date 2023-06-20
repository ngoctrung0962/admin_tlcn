import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import "./Lecture.css";
const Lecture = ({ lecture }) => {
  return (
    <div className="lecture__container">
      <div className="lecture__tool">
        <div className="lecture__name">
          <h3>
            <span className="pe-3">
              <GrDocumentText />
            </span>{" "}
            lecture: {lecture.lectureName}
          </h3>
        </div>
        <div className="lecture__action">
          <button className="btn btn-save">
            <AiOutlineDelete />
          </button>
          <button className="btn btn-save">
            <AiOutlineEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lecture;
