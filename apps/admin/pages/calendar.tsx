import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('../src/components/Calendar'), {
  ssr: false
});

const SampleCalendar = () => {
  return (
    <>
      <Calendar />
    </>
  );
};

export default SampleCalendar;
