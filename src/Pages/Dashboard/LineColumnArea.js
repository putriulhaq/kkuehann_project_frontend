import React, { useEffect, useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { APIClient } from '../../helpers/api_helper';
import * as url from "../../../src/helpers/url_helper";

const api = new APIClient()

const LineColumnArea = () => {
  const [summary, setSummary] = useState({ dates: [], order_counts: [] });

  const fetchData = async () => {
    try {
      const data = await api.get(url.GET_SALES_SUMMARY);
      setSummary(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const series = useMemo(() => [{
    name: "Order",
    type: "column",
    data: summary.order_counts || []
  }], [summary.order_counts]);

  const options = useMemo(() => ({
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
      toolbar: {
        show: false
      },
    },
    stroke: {
      width: [0, 1, 1],
      dashArray: [0, 0, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: "18%",
      },
    },
    legend: {
      show: false,
    },
    colors: ["#0ab39c"],
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: summary.dates || [],
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        formatter: (val) => {
          return Math.floor(val);
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " orders"
          }
          return y
        },
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
  }), [summary.dates]);

  if (summary.dates.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="350"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default LineColumnArea;