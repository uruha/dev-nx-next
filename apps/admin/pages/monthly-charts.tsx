import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('../src/components/MonthlyCharts'), {
  ssr: false
});

const MothlyChartsPages = () => <Chart />;

export default MothlyChartsPages;