import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Chart.css";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import { getElementAtEvent, Doughnut } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale);

export const centerText = [
  {
    id: "centerText",
    beforeDraw(chart) {
      const { width } = chart;
      const { height } = chart;
      const { ctx } = chart;
      ctx.restore();
      const fontSize = 2;
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      ctx.fillText(chart?.data?.datasets[0]?.text, width / 2, height / 1.5);
      ctx.save();
    },
  },
];

export const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const halfdoughnutOptions = {
  responsive: true,
  maintainAspectRatio: true,
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const Chart = (props) => {
  const { data } = props;
  const pieRef = useRef(null);
  const [chartIndex, setChartIndex] = useState(0);
  const [userSelectSecondChartData, setUserSelectSecondChartData] = useState(
    []
  );
  const [firstChartData, setFirstChartData] = useState([]);
  const [firstChartBackgroundColor, setFirstChartBackgroundColor] = useState(
    []
  );
  const [firstChartBorderColor, setFirstChartBorderColor] = useState([]);
  const [secondChartBackgroundColor, setSecondChartBackgroundColor] = useState(
    []
  );
  const [secondChartBorderColor, setsecondChartBorderColor] = useState([]);
  const [firstChartTitle, setFirstChartTitle] = useState([]);
  const [secondChartTitle, setSecondChartTitle] = useState([]);
  const [secondChartData, setSecondChartData] = useState([]);
  const [secondChartCenterText, setSecondChartCenterText] = useState([]);
  const [userSelectedExtraData, setUserSelectedExtraData] = useState([]);

  const doughnutData = {
    labels: firstChartTitle ?? [],
    datasets: [
      {
        label: data?.firstChartDataSetLabel,
        data: firstChartData ?? [],
        backgroundColor: firstChartBackgroundColor,
        borderColor: firstChartBorderColor,
        borderWidth: 1,
      },
    ],
  };

  const halfdoughnutData = {
    labels: secondChartTitle ?? [],
    datasets: [
      {
        label: data?.secondChartDataSetLabel,
        data: userSelectSecondChartData ?? [],
        backgroundColor: secondChartBackgroundColor,
        borderColor: secondChartBorderColor,
        borderWidth: 1,
        text: secondChartCenterText[chartIndex],
      },
    ],
  };

  useEffect(() => {
    if (secondChartData) {
      setUserSelectSecondChartData(secondChartData[chartIndex]);
    }

    if (data?.extraData.length !== 0 && data?.extraData[chartIndex]) {
      setUserSelectedExtraData(data?.extraData[chartIndex]);
    }
  }, [chartIndex, secondChartData, data]);

  useEffect(() => {
    if (data?.firstChart) {
      setFirstChartBackgroundColor([]);
      setFirstChartBorderColor([]);
      setFirstChartData([]);
      setFirstChartTitle([]);
      setSecondChartData([]);
      setSecondChartCenterText([]);
      data?.firstChart.map((data) => {
        setFirstChartBackgroundColor((oldData) => [
          ...oldData,
          data?.backgroundColor ?? "",
        ]);
        setFirstChartBorderColor((oldData) => [
          ...oldData,
          data?.borderColor ?? "",
        ]);

        setFirstChartTitle((oldData) => [...oldData, data?.name ?? ""]);
        setFirstChartData((oldData) => [...oldData, data?.data ?? ""]);
        setSecondChartData((oldData) => [
          ...oldData,
          data?.secondChartData ?? [],
        ]);
        setSecondChartCenterText((oldData) => [
          ...oldData,
          data?.secondChartCenterText ?? "",
        ]);
        return true;
      });
    }

    if (data?.secondChart) {
      setsecondChartBorderColor([]);
      setSecondChartBackgroundColor([]);
      setSecondChartTitle([]);

      data?.secondChart.map((data) => {
        setSecondChartBackgroundColor((oldData) => [
          ...oldData,
          data?.backgroundColor ?? "",
        ]);
        setsecondChartBorderColor((oldData) => [
          ...oldData,
          data?.borderColor ?? "",
        ]);
        setSecondChartTitle((oldData) => [...oldData, data?.name ?? ""]);

        return true;
      });
    }
  }, [data]);

  return (
    <div className="container-xxl mt-5">
      <div className="row">
        <div className="col-12 col-xxl-6 col-lg-6 col-md-12 col-sm-12 ">
          <div className="row">
            <div className="col-12 col-xxl-6 col-md-6 col-sm-12">
              <Doughnut
                style={{ cursor: "pointer" }}
                data={doughnutData}
                options={doughnutOptions}
                ref={pieRef}
                onClick={(event) => {
                  const element = getElementAtEvent(pieRef.current, event);
                  setChartIndex(element[0]?.index ?? 0);
                }}
              />
            </div>
            <div className="col-12 col-xxl-6 col-md-6 col-sm-12 mt-5">
              <div className="d-flex flex-wrap flex-column justify-content-center">
                {data?.firstChart?.map((data) => {
                  return (
                    <div key={data?.name} className="">
                      <span
                        style={{
                          float: "left",
                          height: "20px",
                          width: "20px",
                          //   marginBottom: "15px",
                          border: "1px solid black",
                          clear: "both",
                          backgroundColor: `${data?.backgroundColor}`,
                          marginRight: "5px",
                        }}
                      ></span>

                      <label className="pl-10">{data?.name}</label>
                    </div>
                  );
                })}
              </div>
              <div className="d-flex flex-wrap flex-column justify-content-center">
                {data?.tipData && data?.tipData?.length !== 0 && (
                  <div className="mt-5 text-break">
                    <div>
                      <h6 className="pl-10">{data?.firstChartTipTitle}</h6>
                    </div>
                    <div>
                      <label className="pl-10 tip-data text-wrap">
                        {data?.tipData[chartIndex]?.firstChartTip ?? ""}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xxl-6 col-lg-6 col-md-12 col-sm-12">
          <div className="row">
            <div className="col-12 col-xxl-6 col-md-6 col-sm-12 ">
              <Doughnut
                data={halfdoughnutData}
                options={halfdoughnutOptions}
                height="400px"
                plugins={centerText}
              />
            </div>
            <div className="col-12 col-xxl-6 col-md-6 col-sm-12 mt-5">
              <div className="d-flex flex-wrap flex-column justify-content-center">
                {data?.secondChart?.map((data) => {
                  return (
                    <div key={data?.name} className="w-100">
                      <span
                        style={{
                          float: "left",
                          height: "20px",
                          width: "20px",
                          //   marginBottom: "15px",
                          border: "1px solid black",
                          clear: "both",
                          backgroundColor: `${data?.backgroundColor}`,
                          marginRight: "5px",
                        }}
                      ></span>

                      <label className="pl-10">{data?.name}</label>
                    </div>
                  );
                })}
              </div>

              <div className="d-flex flex-wrap flex-column justify-content-center">
                {data?.tipData && data?.tipData?.length !== 0 && (
                  <div className="mt-5 text-break tip-data">
                    <div>
                      <h6 className="pl-10">{data?.secondChartTipTitle}</h6>
                    </div>
                    <div>
                      <label className="pl-10 tip-data">
                        {data?.tipData[chartIndex]?.secondChartTip ?? ""}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap mt-5">
        {userSelectedExtraData && userSelectedExtraData.length !== 0 && (
          <div className="d-flex flex-wrap flex-column">
            <div>
              <h4>{data?.labelExtraData ?? ""}</h4>
            </div>
            {Object.keys(userSelectedExtraData).map((key, index) => (
              <div className="my-3" key={index}>
                <h6>{key.charAt(0).toUpperCase() + key.slice(1)}</h6>
                <span>{userSelectedExtraData[key]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
