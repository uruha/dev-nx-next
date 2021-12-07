import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const actionAData = {
  name: 'Action A',
  type: 'column',
  data: [23, 110, 22, 27, 13, 22, 37, 21, 44, 22, 30, 20]
};

const actionBData = {
  name: 'Action B',
  type: 'column',
  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 61]
};

const actionCData = {
  name: 'Action C',
  type: 'column',
  data: [10, 74, 34, 7, 53, 33, 87, 26, 34, 12, 38, 25]
};

const Degree = {
  name: 'Degree',
  type: 'line',
  data: [3, 4, 10, 1, 0, 2, 4, 5, 8, 3, 7, 4]
};

const Fragmented = {
  name: 'Fragmented',
  type: 'area',
  // data: [10, 10, null, 10, 10, 10, null, 10, 10, 10, null, null]
  data: [-1, -1, null, -1, -1, -1, null, -1, -1, -1, null, -1]
};

const actionsData = [actionAData, actionBData, actionCData];

const getTheHighestValue = (a, b) => Math.max(a, b);
const maximumValueOfEach = actionsData.map((c) => c.data.reduce(getTheHighestValue));
const maxDegreeValue = Degree.data.reduce(getTheHighestValue) + 2;
const stackedMaxValue = maximumValueOfEach.reduce((sum, value) => sum + value, 0);

const series = [
  actionAData,
  actionBData,
  actionCData,
  Degree,
  Fragmented
];

const options: ApexOptions = {
  chart: {
    height: 350,
    type: 'line',
    stacked: true,
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [0, 1, 2, 3]
  },
  stroke: {
    width: [1, 1, 1, 4]
  },
  plotOptions: {
    bar: {
      columnWidth: '70%'
    }
  },
  labels: ['01/01/2021', '02/01/2021', '03/01/2021', '04/01/2021', '05/01/2021', '06/01/2021', '07/01/2021',
    '08/01/2021', '09/01/2021', '10/01/2021', '11/01/2021', '12/01/2021'
  ],
  markers: {
    size: [0, 0, 0, 0, 6]
  },
  xaxis: {
    type: 'datetime'
  },
  yaxis: [
    // Action A
    {
      seriesName: 'Action A',
      title: {
        text: 'Points'
      },
      show: true,
      // max: maxValue
      max: stackedMaxValue,
    },
    // Action B
    {
      seriesName: 'Action B',
      title: {
        text: 'Points'
      },
      show: false,
      // max: maxValue
      max: stackedMaxValue
    },
    // Action C
    {
      seriesName: 'Action C',
      title: {
        text: 'Points'
      },
      show: false,
      // max: maxValue
      max: stackedMaxValue
    },
    // Degree
    {
      seriesName: 'Degree',
      max: maxDegreeValue,
      opposite: true,
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#ff4862'
      },
      labels: {
        style: {
          colors: '#ff4862',
        },
      },
      title: {
        text: 'Degree',
        style: {
          color: '#ff4862',
        }
      }
    },
    // Fragmented
    {
      seriesName: 'Fragmented',
      show: false,
      max: 0,
      min: -20
    },
  ],
  tooltip: {
    enabled: true,
    enabledOnSeries: [0, 1, 2, 3],
    shared: true,
    intersect: false,
    y: {
      formatter: function (y) {
        if (typeof y !== "undefined") {
          return y?.toFixed(0) + " times";
        }
        return y;
      }
    }
  },
  annotations: {
    position: 'back',
    xaxis: [
      {
        // エポックミリ秒じゃないと駄目っぽい
        x: new Date('01/01/2021').getTime(),
        x2: new Date('04/01/2021').getTime(),
        fillColor: '#B3F7CA',
        label: {
          text: 'range'
        }
      },
      {
        x: new Date('08/01/2021').getTime(),
        x2: new Date('09/01/2021').getTime(),
        fillColor: '#B3F7CA',
        label: {
          text: 'range'
        }
      }
    ]
  },
  fill: {
    type: [
      'solid',
      'solid',
      'solid',
      'solid',
      'pattern'
    ],
    pattern: {
      style: 'verticalLines',
      strokeWidth: 6
    }
  }
};

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