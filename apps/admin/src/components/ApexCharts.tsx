import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const options: ApexOptions = {
  chart: {
    height: 350,
    type: 'bar',
    stacked: true,
  },
  stroke: {
    width: [0, 2, 5]
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
    }
  },
  fill: {
    opacity: 1,
    gradient: {
      inverseColors: false,
      shade: 'light',
      type: "vertical",
      opacityFrom: 0.85,
      opacityTo: 0.55,
      stops: [0, 100, 100, 100]
    }
  },
  labels: ['01/01/2021', '02/01/2021', '03/01/2021', '04/01/2021', '05/01/2021', '06/01/2021', '07/01/2021',
    '08/01/2021', '09/01/2021', '10/01/2021', '11/01/2021'
  ],
  markers: {
    size: 0
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: {
    title: {
      text: 'Points',
    },
    min: 0
  },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " points";
        }
        return y;
      }
    }
  }
};

const series = [{
  name: 'Column A',
  type: 'column',
  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
}, {
  name: 'Column B',
  type: 'column',
  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
}, {
  name: 'Line',
  type: 'line',
  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
}];

const ApexCharts = () => {
  return (
    <div id="apex">
      <Chart
        options={options}
        series={series}
      />
    </div>
  );
};

export default ApexCharts;