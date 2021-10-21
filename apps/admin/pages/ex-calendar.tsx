import Router from 'next/router';

import FullCalendar, { DatesSetArg, EventClickArg, EventContentArg, EventSourceInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

const dailyEventsData = [
  {
    start: '2021-10-18',
    extendedProps: {
      fisrt: {
        event: true,
        detail: {
          level: 'high',
          kinds: ['hoge', 'fuga'],
          trigger: ['dog', 'cat']
        },
        meal: [
          {
            kinds: 'rice',
            times: 2,
            effect: true
          }
        ]
      },
      second: {},
      third: {}
    }
  }
];

const isEmptyObj = (obj) => 
  Object.keys(obj).length === 0 && obj.constructor === Object;

const events: EventSourceInput = dailyEventsData;

const dateNow = new Date();
const nextMonthAfterTheCurrentMonth =
  `${dateNow.getFullYear()}-${dateNow.getMonth()+2}-01`;

const handleDateClick = (info: DateClickArg) => {
  console.log(info);
};

const handleChangeDate = (dateInfo: DatesSetArg) => {
  console.log(dateInfo);
};

const handleClickEvent = (clickEventInfo: EventClickArg) => {
  console.log(clickEventInfo);
};

const customEventContent = (eventInfo: EventContentArg) => {
  console.log(eventInfo);
  return (
    <>
      <span>{eventInfo.event.startStr}</span>
    </>
  );
}

export default function Index() {
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
    /**
     * @NOTE
     * スクロールバー対策だと絶対値で割り切ったほうが良さそう
     */
    height={800}
    dateClick={handleDateClick}
    datesSet={handleChangeDate}
    /**
     * custom date cell
     */
    eventContent={customEventContent}
    eventClick={handleClickEvent}
  />
};