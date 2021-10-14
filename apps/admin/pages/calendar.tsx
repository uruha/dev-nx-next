import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const dateNow = new Date();
const twoMonthsAfterTheCurrentMonth =
  `${dateNow.getFullYear()}-${dateNow.getMonth()+3}-01`;

export default function Index() {
  return <FullCalendar
    // eslint-disable-next-line
    // @ts-ignore
    plugins={[dayGridPlugin]}
    locale="ja"
    initialEvents={[
      { title: 'nice event', start: new Date() }
    ]}
    initialView='dayGridMonth'
    validRange={{
      end: `${twoMonthsAfterTheCurrentMonth}`
    }}
  />
};