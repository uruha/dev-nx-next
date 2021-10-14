import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

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
      end: '2021-12-01'
    }}
  />
};