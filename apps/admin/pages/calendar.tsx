import Router from 'next/router';

import FullCalendar, { DatesSetArg, EventContentArg } from '@fullcalendar/react';
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

const handleChangeDate = (dateInfo: DatesSetArg) => {
  console.log(dateInfo);
  console.log(`current Year: ${dateInfo.view.currentStart.getFullYear()}`);
  console.log(`current month: ${dateInfo.view.currentStart.getMonth()+1}`);
};

const customEventContent = (eventInfo: EventContentArg) => {
  console.log(eventInfo);
  return (
    <>
      <span>{eventInfo.timeText}</span>
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
    events={[
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
    /**
     * custom date cell
     */
    eventContent={customEventContent}
  />
};