import dynamic from 'next/dynamic';
import { useSidePanel } from '../src/hooks/useSidePanel';

import styles from './ex-calendar.module.css';

const ExCellCalendar = dynamic(() => import('../src/components/ExCellCalendar'), {
  ssr: false
});

const SampleExCalendar = () => {
  const SampleMetaData = useSidePanel();

  return (
    <div className={styles.container}>
      <div>
        <ExCellCalendar
          open={SampleMetaData.open}
        />
      </div>
      <div id="side-panel">
       <SampleMetaData.SidePanel>
         <h3>にゃんこ</h3>
       </SampleMetaData.SidePanel>
      </div>
    </div>
  );
};

export default SampleExCalendar;
