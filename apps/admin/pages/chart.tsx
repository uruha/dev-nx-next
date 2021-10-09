import { Chart as Chartjs } from 'chart.js';
import * as Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
Chartjs.register(annotationPlugin);

const rand = () => Math.round(Math.random() * 20 - 10);

const boxAnnotation = {
  type: 'box',
  xScaleID: 'x',
  yScaleID: 'y',
  xMin: 'February',
  xMax: 'April',
  yMin: 0,
  yMax: 1,
  backgroundColor: 'rgba(250,250,0,0.4)',
  borderColor: 'rgba(0,150,0,0.2)',
  drawTime: 'beforeDatasetsDraw',
  borderWidth: 1,
  borderRadius: 0,
};

const options: Chart.ChartOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked'
    },
    annotation: {
      annotations: [
        // @TODO type error
        boxAnnotation
      ]
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',

      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    }
  }
};

const data: Chart.ChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      fill: false,
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'rgb(255, 99, 132)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      borderColor: 'white',
      stack: 'combined',
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      stack: 'combined',
    },
    {
      type: 'bar',
      label: 'Dataset 4',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      stack: 'combined',
    },
  ]
};

export default function Index() {
  return <Bar
    data={data}
    options={options}
  />;
}