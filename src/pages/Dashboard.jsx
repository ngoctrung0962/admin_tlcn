import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Box from "../components/box/Box";
import DashboardWrapper, {
  DashboardWrapperMain,
  DashboardWrapperRight,
} from "../components/dashboard-wrapper/DashboardWrapper";
import SummaryBox, {
  SummaryBoxSpecial,
} from "../components/summary-box/SummaryBox";
import { colors, data } from "../constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import OverallList from "../components/overall-list/OverallList";
import RevenueList from "../components/revenue-list/RevenueList";
import reportApi from "../api/reportApi";
import { useForm } from "react-hook-form";
import moment from "moment/moment";

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
  return (
    <DashboardWrapper>
      <DashboardWrapperMain>
        <div className="row">
          <div className="coll-8 coll-md-12">
            <div className="row">
              {data.summary.map((item, index) => (
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
            <SummaryBoxSpecial item={data.revenueSummary} />
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
  console.log("chartData", chartData);
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
  console.log("chartData", chartData);
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
