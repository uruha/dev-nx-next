import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const createMonthlyDays = (start: Date, end: Date) => {
  const dateList: number[] = [];

  for(const d = start; d <= end; d.setDate(d.getDate()+1)) {
    const formatedDate = `${d.getFullYear()}-${(d.getMonth()+1)}-${d.getDate()} UTC`;
    const formatedTimestamp = Date.parse(formatedDate);
    dateList.push(formatedTimestamp);
  }
  return dateList;
};

const createRandomValues = (max: number, length: number) => {
  const values: number[] = [];

  for(let i = 0; i < length; i++) {
    values.push(
      Math.floor(Math.random() * Math.floor(max))
    );
  }
  return values;
}

const monthlyDays = createMonthlyDays(
  new Date('2021-12-1'),
  new Date('2021-12-31')
);

const dayCount = monthlyDays.length;

const actionAData = {
  name: 'Action A',
  type: 'column',
  data: createRandomValues(100, dayCount)
};

const actionBData = {
  name: 'Action B',
  type: 'column',
  data: createRandomValues(100, dayCount)
};

const actionCData = {
  name: 'Action C',
  type: 'column',
  data: createRandomValues(100, dayCount)
};

const Degree = {
  name: 'Degree',
  type: 'line',
  data: createRandomValues(10, dayCount)
};

const actionsData = [actionAData, actionBData, actionCData];

const getTheHighestValue = (a, b) => Math.max(a, b);
const maximumValueOfEach = actionsData.map((c) => c.data.reduce(getTheHighestValue));
const maxDegreeValue = Degree.data.reduce(getTheHighestValue) + 2;
const stackedMaxValue = maximumValueOfEach.reduce((sum, value) => sum + value, 0);

/** serise */
const series = [
  actionAData,
  actionBData,
  actionCData,
  Degree
];

/** options */
const options: ApexOptions = {
  chart: {
    height: 200,
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
  markers: {
    size: [0, 0, 0, 0, 6]
  },
  xaxis: {
    type: 'datetime',
    categories: monthlyDays
  },
  yaxis: [
    // Action A
    {
      seriesName: 'Action A',
      title: {
        text: 'Points'
      },
      show: true,
      max: stackedMaxValue,
    },
    // Action B
    {
      seriesName: 'Action B',
      title: {
        text: 'Points'
      },
      show: false,
      max: stackedMaxValue
    },
    // Action C
    {
      seriesName: 'Action C',
      title: {
        text: 'Points'
      },
      show: false,
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
    }
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
        // x: new Date('12/01/2021').getTime(),
        // x2: new Date('12/05/2021').getTime(),
        x: Date.parse('12/01/2021 UTC'),
        x2: Date.parse('12/05/2021 UTC'),
        fillColor: '#B3F7CA',
        label: {
          text: 'range'
        }
      },
      {
        // 上記とどっちでも行ける
        x: new Date('12/20/2021 UTC').getTime(),
        x2: new Date('12/26/2021 UTC').getTime(),
        fillColor: '#B3F7CA',
        label: {
          text: 'range'
        }
      }
    ]
  }
};

const MonthlyCharts = () => {
  return (
    <>
      <Chart
        options={options}
        series={series}
      />
    </>
  );
};

export default MonthlyCharts;