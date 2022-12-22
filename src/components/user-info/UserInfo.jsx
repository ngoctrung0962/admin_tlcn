import React from "react";
import "./user-info.scss";

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      <div className="user-info__img">
        <img
          src={
            user.avatar ? user.avatar : require("../../assets/images/avt.jpg")
          }
          alt=""
        />
      </div>
      <div className="user-info__name">
        <span>{user.fullname}</span>
      </div>
    </div>
  );
};

export default UserInfo;
