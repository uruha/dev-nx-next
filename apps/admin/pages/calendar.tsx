import Router from 'next/router';

import FullCalendar, { DatesSetArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

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

const handleChangeDate = (dateInfo: DatesSetArg) => console.log(dateInfo);

export default function Index() {
  return <FullCalendar
    // eslint-disable-next-line
    // @ts-ignore
    plugins={[
      dayGridPlugin,
      interactionPlugin
    ]}
    locale="ja"
    initialEvents={[
      { title: 'nice event', start: new Date() }
    ]}
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
  />
};