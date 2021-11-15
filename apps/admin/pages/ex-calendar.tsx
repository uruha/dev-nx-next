import dynamic from 'next/dynamic';

const ExCellCalendar = dynamic(() => import('../src/components/ExCellCalendar'), {
  ssr: false
});

const SampleExCalendar = () => {
  return (
    <>
      <ExCellCalendar />
    </>
  );
};

export default SampleExCalendar;
