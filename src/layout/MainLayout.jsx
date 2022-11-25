import React from "react";
import "./main-layout.scss";
import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import { Breadcrumbs, Typography } from "@mui/material";

const MainLayout = () => {
  const location = useLocation();
  const path = location.pathname.split("/");
  path.shift();
  const lastPath = path[path.length - 1];
  return (
    <>
      <Sidebar />

      <div className="main">
        <div className="main__content">
          <TopNav />
          <Breadcrumbs aria-label="breadcrumb" className="mb-3">
            <Link to="/">HOME</Link>
            {path.map((item, index) => {
              if (index === path.length - 2) {
                return (
                  <Link key={index} to={`/${item}`}>
                    {item.toUpperCase()}
                  </Link>
                );
              }
              return (
                <Typography color="text.primary">
                  {item.toUpperCase()}
                </Typography>
              );
            })}
          </Breadcrumbs>
          <div className="content__container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
