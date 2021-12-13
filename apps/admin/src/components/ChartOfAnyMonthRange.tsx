import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

import { threeMonthRange } from '../libs/date-treatment';

/** sample util */
const createRandomValues = (max: number, length: number) => {
  const values: number[] = [];

  for(let i = 0; i < length; i++) {
    values.push(
      Math.floor(Math.random() * Math.floor(max))
    );
  }
  return values;
}

const monthlyDays = threeMonthRange.map(d => d.format('YYYY-MM-DD'));
const dayCount = monthlyDays.length;

/** Color set */
const actionAHex = '#009944';
const actionBHex = '#79c06e';
const actionCHex = '#bee0c2';
const lineHex    = '#ff4862';
const rangeHex   = '#ffdc00';

/** Data set */
const actionAData = {
  name: 'Action A',
  type: 'column',
  data: createRandomValues(10, dayCount)
};

const actionBData = {
  name: 'Action B',
  type: 'column',
  data: createRandomValues(10, dayCount)
};

const actionCData = {
  name: 'Action C',
  type: 'column',
  data: createRandomValues(10, dayCount)
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

/** annotation option */
const annotationOption = {
  fillColor: rangeHex,
  label: {
    text: 'range',
    textAnchor: 'start',
    orientation: 'horizontal'
  }
};

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
    toolbar: {
      show: false
    }
  },
  /**
   * @see https://apexcharts.com/docs/colors/
   * base colors for serise data order
   */
  colors: [
    actionAHex,
    actionBHex,
    actionCHex,
    lineHex
  ],
  /**
   * @see https://apexcharts.com/docs/options/legend/
   */
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    markers: {
      radius: 0
    },
    onItemClick: {
      toggleDataSeries: false
    }
  },
  dataLabels: {
    enabled: true,
    enabledOnSeries: [0, 1, 2],
    background: {
      padding: 0,
      borderWidth: 0,
      borderRadius: 0,
      dropShadow: {
        enabled: false
      }
    }
  },
  markers: {
    size: 0
  },
  stroke: {
    width: [0, 0, 0, 2]
  },
  plotOptions: {
    bar: {
      columnWidth: '80%',
      dataLabels: {
        position: 'center'
      }
    }
  },
  fill: {
    colors: [
      actionAHex,
      actionBHex,
      actionCHex
    ]
  },
  xaxis: {
    type: 'datetime',
    categories: monthlyDays,
    labels: {
      format: 'yy/MM/dd'
    }
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
        color: lineHex
      },
      labels: {
        style: {
          colors: lineHex,
        },
      },
      title: {
        text: 'Degree',
        style: {
          color: lineHex,
        }
      }
    }
  ],
  tooltip: {
    enabled: true,
    enabledOnSeries: [0, 1, 2, 3],
    shared: true,
    intersect: false,
    x: {
      format: 'yy/MM/dd',
    },
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
        x: Date.parse('2021/11/29 09:00:00'),
        x2: Date.parse('2021/12/05 09:00:00'),
        ...annotationOption
      },
      {
        x: new Date('2021/12/20 09:00:00').getTime(),
        x2: new Date('2021/12/26 09:00:00').getTime(),
        ...annotationOption
      },
      {
        x: new Date('2022/01/18 09:00:00').getTime(),
        x2: new Date('2022/01/26 09:00:00').getTime(),
        ...annotationOption
      },
      {
        x: new Date('2022/02/12 09:00:00').getTime(),
        x2: new Date('2022/02/18 09:00:00').getTime(),
        ...annotationOption
      }
    ]
  }
};

const ChartOfAnyMonthRange = () => {
  return (
    <>
      <Chart
        options={options}
        series={series}
      />
    </>
  );
};

export default ChartOfAnyMonthRange;