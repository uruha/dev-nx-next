import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const now = dayjs().tz("Asia/Tokyo");
const start = now.startOf("month");

// const isTheStartDayHasSunday = start.format("ddd") === "Sun";

const getInTheLastSixDays = (length= 6): Dayjs[] => {
  const lastSixDays = [];

  for (let i = 1; i <= length; i++) {
    const subtractDay = start.subtract(i, "d");
    lastSixDays.push(subtractDay);
  }

  return lastSixDays;
};

const filterHasSunday = getInTheLastSixDays().filter(
  (d) => d.format("ddd") === "Sun"
);

// const hasSunday = filterHasSunday.length !== 0;

const firstSunday = filterHasSunday[0];

const getInTheFutureSixDaysFromFirstSunday = (length = 6) => {
  const futureSixDays = [];

  for (let i = 1; i <= length; i++) {
    const addDay = firstSunday.add(i, "d");
    futureSixDays.push(addDay);
  }

  return futureSixDays;
};

const filterHasSaturday = getInTheFutureSixDaysFromFirstSunday().filter(
  (d) => d.format("ddd") === "Sat"
);

const firstSaturday = filterHasSaturday[0];

// 日曜日版
// const getThirteenWeeksWorthOfDays = (length = 14): Dayjs[] => {
//   const lastThreeMonthsSunday = [];

//   for (let i = 1; i <= length; i++) {
//     const addDay = firstSunday.add(i, "w");
//     lastThreeMonthsSunday.push(addDay);
//   }

//   return lastThreeMonthsSunday;
// };

// const lastSaturdayOfTheLastThreeMonths = getThirteenWeeksWorthOfDays()[13].subtract(
//   1,
//   "s"
// );

// 土曜日版
const getThirteenWeeksWorthOfDays = (length = 13): Dayjs[] => {
  const lastThreeMonthsSaturday = [];

  for (let i = 0; i <= length; i++) {
    const addDay = firstSaturday.add(i, "w");
    lastThreeMonthsSaturday.push(addDay);
  }

  return lastThreeMonthsSaturday;
};

const lastSaturdayOfTheLastThreeMonths = getThirteenWeeksWorthOfDays()[13].endOf('day');

const thirteenWeeksWorthOfDays = getThirteenWeeksWorthOfDays();
thirteenWeeksWorthOfDays.splice(13, 13, lastSaturdayOfTheLastThreeMonths);

export const threeMonthRange = thirteenWeeksWorthOfDays;