import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { GiTakeMyMoney } from "react-icons/gi";
import Box from "../box/Box";
import "./summary-box.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SummaryBox = ({ item }) => {
  return (
    <Box>
      <div className="summary-box">
        <div className="summary-box__info">
          <div className="summary-box__info__title">
            <div>{item.title}</div>
            <span>{item.subtitle}</span>
          </div>
          <div className="summary-box__info__value">{item.value}</div>
        </div>
        <div className="summary-box__chart">
          <CircularProgressbarWithChildren
            value={100}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: item.color,
              trailColor: "transparent",
              strokeLinecap: "round",
            })}
          >
            <div className="summary-box__chart__value">
              {/* {item.percent}% */}
              {item.icon}
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </Box>
  );
};

export default SummaryBox;

export const SummaryBoxSpecial = ({ item }) => {
  return (
    <Box purple fullheight>
      <div className="summary-box-special">
        <div className="summary-box-special__title">{item.title}</div>
        <div className="summary-box-special__value">
          {Number(item.value).toLocaleString("vi", {
            currency: "VND",
          })}{" "}
          VND
        </div>
        <div className="summary-box-special__chart" style={{ height: "250px" }}>
          {/* <Line options={chartOptions} data={chartData} width={`250px`} /> */}
          <GiTakeMyMoney size={250} />
        </div>
      </div>
    </Box>
  );
};
