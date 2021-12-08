import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('../src/components/ApexCharts'), {
  ssr: false
});

const ApexChartsPages = () => <Chart />;

export default ApexChartsPages;
