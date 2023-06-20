import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { images } from "../../constants";
import { CgMenuGridR } from "react-icons/cg";
import sidebarNav from "../../configs/sidebarNav";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { deleteDetailUser } from "../../redux/userRedux";

const Sidebar = () => {
  const user = useSelector((state) => state.user.currentUser);

  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleLogout = async () => {
    Swal.fire({
      title: "Bạn chắc chắn muốn đăng xuất?",
      denyButtonText: "Hủy",
      showDenyButton: true,
      confirmButtonText: `Đăng xuất`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Cookies.remove("token");
        await Cookies.remove("username");
        await dispatch(deleteDetailUser());
        Swal.fire("Đăng xuất thành công!", "", "success");
        nav("/signin");
      }
    });
  };

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNav.findIndex((item) => item.section === curPath);

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  const closeSidebar = () => {
    document.querySelector(".main__content").style.transform =
      "scale(1) translateX(0)";
    setTimeout(() => {
      document.body.classList.remove("sidebar-open");
      document.querySelector(".main__content").style = "";
    }, 500);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <Link to="/">
          <CgMenuGridR size={40} color="#00693e" />
        </Link>

        <div className="sidebar-close" onClick={closeSidebar}>
          <i className="bx bx-x"></i>
        </div>
      </div>
      <div className="sidebar__menu">
        {sidebarNav.map((nav, index) => {
          if (nav.role.includes(user?.role))
            return (
              <Link
                to={nav.link}
                key={`nav-${index}`}
                className={`sidebar__menu__item ${
                  activeIndex === index && "active"
                }`}
                onClick={closeSidebar}
              >
                <div className="sidebar__menu__item__icon">{nav.icon}</div>
                <div className="sidebar__menu__item__txt">{nav.text}</div>
              </Link>
            );
        })}
        <div className="sidebar__menu__item">
          <div className="sidebar__menu__item__icon">
            <i className="bx bx-log-out"></i>
          </div>
          <div className="sidebar__menu__item__txt" onClick={handleLogout}>
            Đăng xuất
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
