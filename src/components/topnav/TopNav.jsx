import React from "react";
import "./topnav.scss";
import UserInfo from "../user-info/UserInfo";
import { data } from "../../constants";
import { useSelector } from "react-redux";

const TopNav = () => {
  const { currentUser } = useSelector((state) => state.user);
  const openSidebar = () => {
    document.body.classList.add("sidebar-open");
  };

  return (
    <div className="topnav">
      <UserInfo user={data.user} />
      <div className="sidebar-toggle" onClick={openSidebar}>
        <i className="bx bx-menu-alt-right"></i>
      </div>
    </div>
  );
};

export default TopNav;
