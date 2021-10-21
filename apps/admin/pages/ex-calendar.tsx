import Router from 'next/router';

import FullCalendar, { DatesSetArg, EventClickArg, EventSourceInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

import { dailyEventsData } from '../lib/ex-calendar-data';
import { CustomEventContent } from '../components/CustomDateCell';

export const isEmptyObj = (obj) => 
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