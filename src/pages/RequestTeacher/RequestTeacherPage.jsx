import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import requestTeacherApi from "../../api/requestTeacherApi";
import RequestAccept from "./components/RequestAccept";
import RequestOpening from "./components/RequestOpening";
import RequestReject from "./components/RequestReject";

const RequestTeacherPage = () => {
  const [loading, setLoading] = useState(false);
  const [listPayments, setlistPayments] = useState([]);
  const [totalPayments, settotalPayments] = useState(0);
  const [paginate, setPaginate] = useState({
    page: 0,
  });
  useEffect(() => {
    fetchData();
  }, [paginate]);

  const fetchData = async () => {
    setLoading(true);
    const res = await requestTeacherApi.getOpeningRequest(paginate.page);
    setlistPayments(res.data.content);
    settotalPayments(res.data?.totalElements);
    setLoading(false);
  };

  //Navigate to edit page

  return (
    <div className="container-fluid">
      <div className="content__head d-flex  justify-content-between">
        <h3 className="content__title mb-3">
          Tất cả yêu cầu trở thành giảng viên
        </h3>
        <div className="content__tool"></div>
      </div>
      <Tabs
        defaultActiveKey="openning"
        id="uncontrolled-tab-example"
        className="mb-3"
        unmountOnExit
      >
        <Tab eventKey="openning" title="Chưa phê duyệt">
          <RequestOpening />
        </Tab>
        <Tab eventKey="approved" title="Đã phê duyệt">
          <RequestAccept />
        </Tab>
        <Tab eventKey="rejected" title="Đã từ chối">
          <RequestReject />
        </Tab>
      </Tabs>
    </div>
  );
};

export default RequestTeacherPage;
