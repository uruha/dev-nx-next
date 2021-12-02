import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const options: ApexOptions = {
  chart: {
    height: 350,
    type: 'line',
    stacked: false,
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [2]
  },
  stroke: {
    width: [1, 1, 4]
  },
  plotOptions: {
    bar: {
      columnWidth: '50%'
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
  yaxis: [
    {
      seriesName: 'Action A',
      title: {
        text: 'Points'
      }
    },
    {
      seriesName: 'Action B',
      title: {
        text: 'Points'
      },
      show: false
    },
    {
      seriesName: 'Degree',
      opposite: true,
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#FEB019'
      },
      labels: {
        style: {
          colors: '#FEB019',
        },
      },
      title: {
        text: 'Degree',
        style: {
          color: '#FEB019',
        }
      }
    }
  ],
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y.toFixed(0) + " times";
        }
        return y;
      }
    }
  }
};

const series = [{
  name: 'Action A',
  type: 'column',
  data: [23, 110, 22, 27, 13, 22, 37, 21, 44, 22, 30]
}, {
  name: 'Action B',
  type: 'column',
  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
}, {
  name: 'Degree',
  type: 'line',
  data: [3, 4, 10, 1, 0, 2, 4, 5, 8, 3, 7]
}];

const ApexCharts = () => {
  return (
    <>
      <Chart
        options={options}
        series={series}
      />
    </>
  );
};

export default ApexCharts;