import Router from 'next/router';

import FullCalendar, { DatesSetArg, DayCellContentArg, EventClickArg, EventContentArg, EventSourceInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

const isEmptyObj = (obj) => 
  Object.keys(obj).length === 0 && obj.constructor === Object;

const events: EventSourceInput = [
  { start: '2021-10-05', title: '入力あり' },
  { start: '2021-10-07', title: '入力あり' },
  { start: '2021-10-13', title: '入力あり' },
  {
    start: '2021-10-18',
    title: '入力あり',
    extendedProps: {
      data: 'hoge'
    }
  }
];

const dateNow = new Date();
const twoMonthsAfterTheCurrentMonth =
  `${dateNow.getFullYear()}-${dateNow.getMonth()+3}-01`;

const handleDateClick = (info: DateClickArg) => {
  console.log(info);
  Router.push({
    pathname: '/daily-events/list',
    query: {
      date: info.dateStr
    }
  });
};

const handleChangeDate = (dateInfo: DatesSetArg) => {
  console.log(dateInfo);
  console.log(`current Year: ${dateInfo.view.currentStart.getFullYear()}`);
  console.log(`current month: ${dateInfo.view.currentStart.getMonth()+1}`);
};

const handleClickEvent = (clickEventInfo: EventClickArg) => {
  console.log(clickEventInfo);
  console.log(clickEventInfo.event.startStr);
  Router.push({
    pathname: '/daily-events/list',
    query: {
      date: clickEventInfo.event.startStr
    }
  });
};

const replaceDateDisplay = (eventInfo: DayCellContentArg) => {
  eventInfo.dayNumberText = eventInfo.dayNumberText.replace('日', '');
};

const customEventContent = (eventInfo: EventContentArg) => {
  console.log(eventInfo);
  return (
    <>
      <span>{eventInfo.event.title}</span>
      {!isEmptyObj(eventInfo.event.extendedProps)
        && <p>{eventInfo.event.extendedProps.data}</p>}
    </>
  );
}

const Calendar = () => {
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
      end: `${twoMonthsAfterTheCurrentMonth}`
    }}
    headerToolbar={{
      left: 'prev',
      center: 'title',
      right: 'next'
    }}
    /**
     * @NOTE
     * スクロールバー対策だと絶対値で割り切ったほうが良さそう
     */
    height={600}
    dateClick={handleDateClick}
    datesSet={handleChangeDate}
    /**
     * custom date cell
     */
    eventContent={customEventContent}
    eventClick={handleClickEvent}
    /**
     * @NOTE
     * @see https://www.mitsue.co.jp/knowledge/blog/frontend/202012/08_0900.html
     */
    dayCellContent={replaceDateDisplay}
  />
};

export default Calendar;
