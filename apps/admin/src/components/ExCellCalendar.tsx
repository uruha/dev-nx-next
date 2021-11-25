import FullCalendar, { DatesSetArg, EventClickArg, EventSourceInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { dailyEventsData } from '../libs/ex-calendar-data';
import { CustomEventContent } from './CustomDateCell';

type Props = {
  sidePanelOpen: () => void;
  selectMedaData: (data) => void;
};

export const isEmptyObj = (obj) => 
  Object.keys(obj).length === 0 && obj.constructor === Object;

const events: EventSourceInput = dailyEventsData;

const dateNow = new Date();
const nextMonthAfterTheCurrentMonth =
  `${dateNow.getFullYear()}-${dateNow.getMonth()+2}-01`;

const ExCellCalendar: React.VFC<Props> = ({ sidePanelOpen, selectMedaData }) => {
  const handleChangeDate = (dateInfo: DatesSetArg) => {
    // console.log(dateInfo);
  };

  const handleDateClick = (info: DateClickArg) => {
    // console.log(info);
  };
  
  const handleClickEvent = (clickEventInfo: EventClickArg) => {
    const extendedProps = clickEventInfo.event._def.extendedProps;

    console.log(clickEventInfo);

    sidePanelOpen();
    if(!isEmptyObj(extendedProps)) {
      selectMedaData(extendedProps);
    }
  };
  
  return <FullCalendar
    // eslint-disable-next-line
    // @ts-ignore
    plugins={[
      dayGridPlugin,
      interactionPlugin
    ]}
    locale="ja"
    /**
     * @see https://fullcalendar.io/docs/initialEvents
     * initialEvents だとカレンダー上の操作などで情報が更新されないので events に寄せておいたほうが良さそう
     */
    events={events}
    initialView='dayGridMonth'
    validRange={{
      end: `${nextMonthAfterTheCurrentMonth}`
    }}
    headerToolbar={{
      left: 'today prev,next',
      center: 'title',
      right: ''
    }}
    contentHeight='auto'
    dateClick={handleDateClick}
    datesSet={handleChangeDate}
    /**
     * custom date cell
     */
    eventContent={CustomEventContent}
    eventClick={handleClickEvent}
  />
};

export default ExCellCalendar;
