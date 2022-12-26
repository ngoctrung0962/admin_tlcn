import images from "./images";
import { GrUserManager } from "react-icons/gr";
import { FaDiscourse } from "react-icons/fa";
import { FaUserGraduate, FaFileContract } from "react-icons/fa";
const data = {
  user: {
    name: "ADMIN",
    img: images.avt,
  },
  summary: [
    {
      title: "Học viên",
      subtitle: "Tổng số học viên tham gia khóa học",
      value: "300/1000",
      color: "#00693e",
      icon: <FaUserGraduate />,
    },
    {
      title: "Khóa học",
      subtitle: "Tổng số khóa học",
      value: "3000",
      color: "#FF9800",
      icon: <FaDiscourse />,
    },
    {
      title: "Giảng viên",
      subtitle: "Tổng số giảng viên ",
      value: "50/100",
      color: "#a23275",
      icon: <GrUserManager />,
    },
    {
      title: "Yêu cầu trở thành giảng viên",
      subtitle: "Tổng số yêu cầu",
      value: "20",
      color: "#F44336",
      icon: <FaFileContract />,
    },
  ],
  revenueSummary: {
    title: "Tổng doanh thu",
    value: "25.000.000 VNĐ",
    chartData: {
      labels: ["May", "Jun", "July", "Aug", "May", "Jun", "July", "Aug"],
      data: [300, 300, 280, 380, 200, 300, 280, 350],
    },
  },
  overall: [
    {
      value: "300K",
      title: "Orders",
    },
    {
      value: "9.876K",
      title: "Customers",
    },
    {
      value: "1.234K",
      title: "Products",
    },
    {
      value: "$5678",
      title: "Revenue",
    },
  ],
  revenueByChannel: [
    {
      title: "Direct",
      value: 70,
    },
    {
      title: "External search",
      value: 40,
    },
    {
      title: "Referal",
      value: 60,
    },
    {
      title: "Social",
      value: 30,
    },
  ],
  revenueByMonths: {
    labels: [
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
    ],
    data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350],
  },
};

export default data;
