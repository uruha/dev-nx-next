import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('../src/components/ChartOfAnyMonthRange'), {
  ssr: false
});

const AnyRangeChartsPages = () => <Chart />;

export default AnyRangeChartsPages;