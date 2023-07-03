import { Enums } from "../utils/Enums";

const sidebarNav = [
  {
    link: "/",
    section: "home",
    icon: <i className="bx bx-home-alt"></i>,
    text: "Dashboard",
    role: [Enums.ROLE.ADMIN, Enums.ROLE.TEACHER],
  },
  // {
  //   link: "/courses",
  //   section: "courses",
  //   icon: <i className="bx bx-cube"></i>,
  //   text: "Khóa học",
  //   role: [Enums.ROLE.ADMIN, Enums.ROLE.TEACHER],
  // },
  {
    link: "/reviewcourses",
    section: "reviewcourses",
    icon: <i className="bx bx-cube"></i>,
    text: "Phê duyệt khóa học",
    role: [Enums.ROLE.REVIEWER],
  },
  {
    link: "/taskofreviewer",
    section: "taskofreviewer",
    icon: <i className="bx bx-cube"></i>,
    text: "Nhiệm vụ của tôi",
    role: [Enums.ROLE.REVIEWER],
  },
  {
    link: "/mycourses",
    section: "mycourses",
    icon: <i className="bx bx-cube"></i>,
    text: "Đăng ký khóa học",
    role: [Enums.ROLE.TEACHER],
  },
  {
    link: "/coursemanagement",
    section: "coursemanagement",
    icon: <i className="bx bx-cube"></i>,
    text: "Quản lí khóa học",
    role: [Enums.ROLE.ADMIN, Enums.ROLE.TEACHER],
  },

  {
    link: "/categories",
    section: "categories",
    icon: <i className="bx bx-receipt"></i>,
    text: "Loại khóa học",
    role: [Enums.ROLE.ADMIN],
  },

  {
    link: "/reviews",
    section: "reviews",
    icon: <i className="bx bx-message-rounded-dots"></i>,
    text: "Bình luận",
    role: [Enums.ROLE.TEACHER, Enums.ROLE.ADMIN],
  },
  {
    link: "/orders",
    section: "orders",
    icon: <i className="bx bx-user"></i>,
    text: "Đơn hàng",
    role: [Enums.ROLE.TEACHER, Enums.ROLE.ADMIN],
  },
  {
    link: "/coupons",
    section: "coupons",
    icon: <i className="bx bx-message-rounded-dots"></i>,
    text: "Coupons",
    role: [Enums.ROLE.ADMIN],
  },
  {
    link: "/payments",
    section: "payments",
    icon: <i className="bx bx-message-rounded-dots"></i>,
    text: "Phương thức thanh toán",
    role: [Enums.ROLE.ADMIN],
  },
  {
    link: "/requestteacher",
    section: "requestteacher",
    icon: <i className="bx bx-user"></i>,
    text: "Yêu cầu trở thành giảng viên",
    role: [Enums.ROLE.ADMIN],
  },
  {
    link: "/managementreviewer",
    section: "managementreviewer",
    icon: <i className="bx bx-user"></i>,
    text: "Quản lý người kiểm duyệt",
    role: [Enums.ROLE.ADMIN],
  },
  {
    link: "/profile",
    section: "profile",
    icon: <i className="bx bx-cube"></i>,
    text: "Quản lí tài khoản",
    role: [Enums.ROLE.ADMIN, Enums.ROLE.TEACHER],
  },
  {
    link: "/changepassword",
    section: "changepassword",
    icon: <i className="bx bx-cube"></i>,
    text: "Đổi mật khẩu",
    role: [Enums.ROLE.ADMIN, Enums.ROLE.TEACHER],
  },
];

export default sidebarNav;
