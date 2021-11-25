import dynamic from 'next/dynamic';
import { useSidePanel } from '../src/hooks/useSidePanel';
import { useCarryData } from '../src/hooks/useCarryData';

import { isEmptyObj } from '../src/components/ExCellCalendar';

import styles from './ex-calendar.module.css';

const ExCellCalendar = dynamic(() => import('../src/components/ExCellCalendar'), {
  ssr: false
});

const SampleExCalendar = () => {
  const SampleMetaData = useSidePanel();
  const hookUseCarryData = useCarryData();

  return (
    <div className={styles.container}>
      <div>
        <ExCellCalendar
          sidePanelOpen={SampleMetaData.open}
          selectMedaData={hookUseCarryData.select}
        />
      </div>
      <div id="side-panel">
       <SampleMetaData.SidePanel>
         <ul>
           <li>
            {!isEmptyObj(hookUseCarryData.selectedData.first) && (
              <div>{hookUseCarryData.selectedData.first.situation}</div>
            )}
           </li>
           <li>
            {!isEmptyObj(hookUseCarryData.selectedData.second) && (
              <div>{hookUseCarryData.selectedData.second.situation}</div>
            )}
           </li>
           <li>
            {!isEmptyObj(hookUseCarryData.selectedData.third) && (
              <div>{hookUseCarryData.selectedData.third.situation}</div>
            )}
           </li>
         </ul>
       </SampleMetaData.SidePanel>
      </div>
    </div>
  );
};

export default SampleExCalendar;
