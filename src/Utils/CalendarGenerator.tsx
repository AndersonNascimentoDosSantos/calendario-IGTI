import { IEvent } from './Backend';

export interface CalendarCell {
  date: string;
  eventsDay: IEvent[];
}
const DAYS_OF_WEEK = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
export const CalendarGenerator = (
  date: string,
  allEvents: IEvent[]
): CalendarCell[][] => {
  const weeks: CalendarCell[][] = [];
  const jsDate = new Date(date + 'T12:00:00Z');
  const currentDay = new Date(jsDate.valueOf());
  const currentMonth = jsDate.getMonth();
  currentDay.setDate(1);
  const DayOfWeek = currentDay.getDay();
  currentDay.setDate(1 - DayOfWeek);
  // console.log(`currente date:${currentDay}`);
  do {
    const weekDays: CalendarCell[] = [];
    for (let i = 0; i < DAYS_OF_WEEK.length; i++) {
      const isoDate = `${currentDay.getFullYear()}-${(currentDay.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${currentDay.getDate().toString().padStart(2, '0')}`;
      weekDays.push({
        date: isoDate,
        eventsDay: allEvents.filter((e) => e.date === isoDate),
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(weekDays);
    // eslint-disable-next-line eqeqeq
  } while (currentDay.getMonth() == currentMonth);
  // console.log(weeks);
  return weeks;
};
