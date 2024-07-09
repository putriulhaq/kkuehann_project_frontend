import React from "react";
import ReactApexChart from "react-apexcharts";

const RadialChart = ({data}) => {
  // const series = [44, 55, 67];
  const series = data.map(data => data.order_count)
  const labels = data.map(data => data.menu_name)
  const total = series.reduce((prev, curr) => prev + curr, 0);

  console.log(total)
  const options = {
    chart: {
      height: 350,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 10,
          size: "45%",
        },
        track: {
          show: true,
          strokeWidth: "70%",
          margin: 12,
        },
        dataLabels: {
          name: {
            fontSize: "27px",
          },
          value: {
            fontSize: "20px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function (w) {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return total;
            },
          },
        },
      },
    },
    labels: labels,
    colors: ["#099680", "#4aa3ff", "#5664d2"],
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height="350"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export default RadialChart;
