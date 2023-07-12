import { Enums } from "../utils/Enums";

const sidebarNav = [
  {
    link: "/",
    section: "home",
    icon: <i className="bx bx-home-alt"></i>,
    text: "Dashboard",
    role: [Enums.ROLE.ADMIN, Enums.ROLE.TEACHER],
  },

  {
    link: "/reviewcourses",
    section: "reviewcourses",
    icon: <i class="bx bx-task"></i>,
    text: "Danh sách nhiệm vụ",
    role: [Enums.ROLE.REVIEWER],
  },
  {
    link: "/taskofreviewer",
    section: "taskofreviewer",
    icon: <i class="bx bx-task"></i>,
    text: "Nhiệm vụ của tôi",
    role: [Enums.ROLE.REVIEWER],
  },
  {
    link: "/mycourses",
    section: "mycourses",
    icon: <i class="bx bx-book-open"></i>,
    text: "Đăng ký khóa học",
    role: [Enums.ROLE.TEACHER],
  },
  {
    link: "/coursemanagement",
    section: "coursemanagement",
    icon: <i class="bx bx-book-open"></i>,
    text: "Quản lý khóa học",
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
    icon: <i class="bx bx-comment-dots"></i>,
    text: "Quản lý đánh giá",
    role: [Enums.ROLE.TEACHER, Enums.ROLE.ADMIN],
  },
  {
    link: "/orders",
    section: "orders",
    icon: <i class="bx bx-book-content"></i>,
    text: "Quản lý đơn hàng",
    role: [Enums.ROLE.TEACHER, Enums.ROLE.ADMIN],
  },
  {
    link: "/coupons",
    section: "coupons",
    icon: <i className="bx bx-message-rounded-dots"></i>,
    text: "Quản lý Coupons",
    role: [Enums.ROLE.ADMIN],
  },
  {
    link: "/payments",
    section: "payments",
    icon: <i class="bx bx-credit-card-front"></i>,
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
    icon: <i className="bx bx-user"></i>,
    text: "Quản lý tài khoản",
    role: [Enums.ROLE.ADMIN, Enums.ROLE.TEACHER, Enums.ROLE.REVIEWER],
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
