import Router from 'next/router';

import FullCalendar, { DatesSetArg, DayCellContentArg, EventClickArg, EventContentArg, EventSourceInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

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

const currentDateAndTime = dayjs().tz();
const twoMonthsAfterTheCurrentMonth = currentDateAndTime.add(2, 'M').startOf('month').format('YYYY-MM-DD');

const handleDateClick = (info: DateClickArg) => {
  console.log(info);
  Router.push({
    pathname: '/daily-events/list',
    query: {
      date: info.dateStr
      // YYYY-MM-DD
    }
  });
};

const handleDatesSet = (dateInfo: DatesSetArg) => {
  const FirstDayOfTheCalendar = dayjs(dateInfo.start).tz().format('YYYY-MM-DD');
  const LastDayOfTheCalendar = dayjs(dateInfo.end).tz().subtract(1, 'd').format('YYYY-MM-DD');
  const NumbersForTheFirstDay = dayjs(dateInfo.start).tz().format('DD');
  const YearAndMonthOfTheSelectedCalendar =
    NumbersForTheFirstDay === '01' ?
    dayjs(dateInfo.start).tz().format('YYYY-MM') :
    dayjs(dateInfo.start).tz().add(1, 'M').format('YYYY-MM');

  console.log(dateInfo);
  console.log(`current Year & Month: ${YearAndMonthOfTheSelectedCalendar}`);
  console.log(`Calendar start day: ${FirstDayOfTheCalendar}`);
  console.log(`Calendar end day: ${LastDayOfTheCalendar}`);
};

const handleClickEvent = (clickEventInfo: EventClickArg) => {
  console.log(clickEventInfo);

  Router.push({
    pathname: '/daily-events/list',
    query: {
      date: clickEventInfo.event.startStr
      // YYYY-MM-DD
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
  return (<div className="simple-calendar">
    <FullCalendar
      // eslint-disable-next-line
      // @ts-ignore
      plugins={[
        dayGridPlugin,
        interactionPlugin
      ]}
      locale='ja'
      timeZone='Asia/Tokyo'
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
      height="auto"
      dateClick={handleDateClick}
      datesSet={handleDatesSet}
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
  </div>)
};

export default Calendar;
