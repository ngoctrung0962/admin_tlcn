import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useForm } from "react-hook-form";
import { FaDiscourse, FaFileContract, FaUserGraduate } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import reportApi from "../api/reportApi";
import Box from "../components/box/Box";
import DashboardWrapper, {
  DashboardWrapperMain,
} from "../components/dashboard-wrapper/DashboardWrapper";
import SummaryBox, {
  SummaryBoxSpecial,
} from "../components/summary-box/SummaryBox";
import { data } from "../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [dataSummary, setDataSummary] = useState([
    {
      title: "Học viên",
      subtitle: "Tổng số học viên tham gia khóa học",
      value: "300/1000",
      color: "#005fb7",
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
      subtitle: "Tổng số giảng viên",
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
  ]);
  const [dataTotalRevenue, setDataTotalRevenue] = useState({
    title: "Tổng doanh thu",
    value: "3000000",
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await reportApi.getDataOverviewReport();
      setDataSummary([
        {
          title: "Học viên",
          subtitle: "Tổng số học viên tham gia khóa học",
          value: `${res.data.studentsNum}/100`,
          color: "#005fb7",
          icon: <FaUserGraduate />,
        },
        {
          title: "Khóa học",
          subtitle: "Tổng số khóa học",
          value: `${res.data.coursesNum}`,
          color: "#FF9800",
          icon: <FaDiscourse />,
        },
        {
          title: "Giảng viên",
          subtitle: "Tổng số giảng viên",
          value: `${res.data.teachersNum}/100`,
          color: "#a23275",
          icon: <GrUserManager />,
        },
        {
          title: "Yêu cầu giảng viên",
          subtitle: "Tổng số yêu cầu",
          value: `${res.data.requestToTeacher}`,
          color: "#F44336",
          icon: <FaFileContract />,
        },
      ]);
      setDataTotalRevenue({
        title: "Tổng doanh thu",
        value: `${res.data.totalRevenues}`,
      });
    };
    fetchData();
  }, []);
  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="row">
          <div className="coll-8 coll-md-12">
            <div className="row">
              {dataSummary?.map((item, index) => (
                <div
                  key={`summary-${index}`}
                  className="coll-6 coll-md-6 coll-sm-12 mb"
                >
                  <SummaryBox item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="coll-4 hide-md">
            <SummaryBoxSpecial item={dataTotalRevenue} />
          </div>
        </div>
        <div className="row">
          <div className="coll-12">
            <Box>
              <RevenueByYearsChart />
            </Box>
          </div>
        </div>
        <div className="row mt-5">
          <div className="coll-12">
            <Box>
              <RevenueByMonthsChart />
            </Box>
          </div>
        </div>
      </DashboardWrapperMain>
      {/* <DashboardWrapperRight>
        <div className="title mb">Overall</div>
        <div className="mb">
          <OverallList />
        </div>
        <div className="title mb">Revenue by channel</div>
        <div className="mb">
          <RevenueList />
        </div>
      </DashboardWrapperRight> */}
    </DashboardWrapper>
  );
};

export default Dashboard;

const RevenueByMonthsChart = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      yAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      bar: {
        backgroundColor: "#005fb7",
        borderRadius: 20,
        borderSkipped: "bottom",
      },
    },
  };

  const fetchDataRevenueByMonth = async (month, year) => {
    const res = await reportApi.getDataReportByMonth(month, year);

    const ArrayData = [];
    const ArrayLabel = [];
    res?.data?.forEach((item) => {
      ArrayData.push(item.value);
      ArrayLabel.push(`${item.day}`);
    });
    setChartData({
      labels: ArrayLabel,
      datasets: [
        {
          label: "Revenue",
          data: ArrayData,
        },
      ],
    });

    //Gắn data vào chart
  };

  const [chartData, setChartData] = useState({
    labels: data.revenueByMonths.labels,
    datasets: [
      {
        label: "Revenue",
        data: data.revenueByMonths.data,
      },
    ],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //Dùng moment để lấy tháng năm hiện tại
      year: moment().year(),
      month: moment().month() + 1,
    },
  });

  const onSubmit = async (data) => {
    await fetchDataRevenueByMonth(data.year, data.month);
  };
  useEffect(() => {
    fetchDataRevenueByMonth(moment().year(), moment().month() + 1);
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="title mb">Doanh thu theo tháng</div>
        <div className="filter__right d-flex gap-1">
          <input
            type="number"
            placeholder="Năm"
            {...register("year", { required: true, min: 1 })}
            className="filter__input"
          />
          {errors.year && <span className="text-danger">Năm không hợp lệ</span>}
          <input
            type="number"
            placeholder="Tháng"
            {...register("month", { required: true, min: 1 })}
            className="filter__input"
          />
          {errors.month && (
            <span className="text-danger">Tháng không hợp lệ</span>
          )}
          <button className="filter__button" onClick={handleSubmit(onSubmit)}>
            Lọc
          </button>
        </div>
      </div>

      <div>
        <Bar options={chartOptions} data={chartData} height={`300px`} />
      </div>
    </>
  );
};

const RevenueByYearsChart = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      yAxes: {
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    elements: {
      bar: {
        backgroundColor: "#005fb7",
        borderRadius: 20,
        borderSkipped: "bottom",
      },
    },
  };

  const fetchDataRevenueByYear = async (year) => {
    const res = await reportApi.getDataReportByYear(year);

    const ArrayData = [];
    const ArrayLabel = [];
    res?.data?.forEach((item) => {
      ArrayData.push(item.value);
      ArrayLabel.push(`Tháng ${item.month}`);
    });
    setChartData({
      labels: ArrayLabel,
      datasets: [
        {
          label: "Revenue",
          data: ArrayData,
        },
      ],
    });

    //Gắn data vào chart
  };

  const [chartData, setChartData] = useState({
    labels: data.revenueByMonths.labels,
    datasets: [
      {
        label: "Revenue",
        data: data.revenueByMonths.data,
      },
    ],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      year: moment().year(),
    },
  });

  const onSubmit = (data) => {
    fetchDataRevenueByYear(data.year);
  };
  useEffect(() => {
    fetchDataRevenueByYear(moment().year());
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="title mb">Doanh thu theo năm</div>
        <div className="filter__right d-flex gap-1">
          <input
            type="number"
            {...register("year", { required: true })}
            className="filter__input"
          />
          <button className="filter__button" onClick={handleSubmit(onSubmit)}>
            Lọc
          </button>
        </div>
      </div>

      <div>
        <Bar options={chartOptions} data={chartData} height={`300px`} />
      </div>
    </>
  );
};
