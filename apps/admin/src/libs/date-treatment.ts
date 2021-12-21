import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

const now = dayjs().tz();
// const start = now.startOf("month");
// const end = now.endOf("month");

// monthly
const getDate = (target?: string) => target ? dayjs(target).tz() : now;

const getDatesInRange = (start: Dayjs, end: Dayjs) => {
  const dateList: Dayjs[] = [];

  for (let i = 0; i <= end.diff(start, "day"); i++) {
    const day = start.add(i, "d");
    dateList.push(day);
  }

  return dateList;
};

export const getTheDateAndTimeOfOneMonth = (target?: string) => {
  const date = getDate(target);

  const start = date.startOf("month");
  const end = date.endOf("month");
  
  // formated
  const startDay = start.format();
  const endDay = end.format();
  const dateList = getDatesInRange(start, end).map(d => d.format('YYYY-MM-DD'));

  return { startDay, endDay, dateList };
};

// 3 month
const isTheStartDayHasSunday = (date: Dayjs) => date.format("ddd") === "Sun";

const getInTheLastSixDays = (start: Dayjs): Dayjs[] => {
  const lastSixDays = [];

  for (let i = 1; i <= 6; i++) {
    const subtractDay = start.subtract(i, "d");
    lastSixDays.push(subtractDay);
  }

  return lastSixDays;
};

const getFirstSunday = (lastSixDays: Dayjs[]) => {
  return lastSixDays.filter(
    (d) => d.format("ddd") === "Sun"
  );
};

const getInTheFutureSixDaysFromFirstSunday = (firstSunday: Dayjs) => {
  const futureSixDays = [];

  for (let i = 1; i <= 6; i++) {
    const addDay = firstSunday.add(i, "d");
    futureSixDays.push(addDay);
  }

  return futureSixDays;
};

const getFirstSaturDay = (futureSixDays: Dayjs[]) => {
  return futureSixDays.filter(
    (d) => d.format("ddd") === "Sat"
  );
};

// 日曜日版
// const getThirteenWeeksWorthOfDays = (firstSunday: Dayjs): Dayjs[] => {
//   const lastThreeMonthsSunday = [];

//   for (let i = 0; i <= 14; i++) {
//     const addDay = firstSunday.add(i, "w");
//     lastThreeMonthsSunday.push(addDay);
//   }

//   return lastThreeMonthsSunday;
// };

// 土曜日版
const getThirteenWeeksWorthOfDays = (firstSaturday: Dayjs): Dayjs[] => {
  const lastThreeMonthsSaturday = [];

  for (let i = 0; i <= 13; i++) {
    const addDay = firstSaturday.add(i, "w");
    lastThreeMonthsSaturday.push(addDay);
  }

  return lastThreeMonthsSaturday;
};

export const getTheDateAndTimeOfThreeMonth = (target?: string) => {
  const date = getDate(target).subtract(2, 'M');
  
  const start = date.startOf("month");
  

  let firstSunday: Dayjs;
  if(isTheStartDayHasSunday(start)) {
    firstSunday = start;
  } else {
    const lastSixDays = getInTheLastSixDays(start);
    firstSunday = getFirstSunday(lastSixDays)[0];
  }

  const futureSixDays = getInTheFutureSixDaysFromFirstSunday(firstSunday);
  const firstSaturday = getFirstSaturDay(futureSixDays)[0];

  const thirteenWeeksWorthOfDays = getThirteenWeeksWorthOfDays(firstSaturday);
  const lastSaturdayOfTheLastThreeMonths = thirteenWeeksWorthOfDays[13].endOf('day');
  // 日曜日版で計算してたら
  // const lastSaturdayOfTheLastThreeMonths = thirteenWeeksWorthOfDays[14].subtract(1, 's');

  thirteenWeeksWorthOfDays.splice(13, 13, lastSaturdayOfTheLastThreeMonths);

  // formated
  const startDay = firstSunday.format();
  const endDay = lastSaturdayOfTheLastThreeMonths.format();
  const dateList = thirteenWeeksWorthOfDays.map(d => d.format('YYYY-MM-DD'));

  return { startDay, endDay, dateList };
};