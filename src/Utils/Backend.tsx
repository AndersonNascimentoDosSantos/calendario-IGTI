export interface IEditingEvent {
  id?: number;
  date: string;
  time?: string;
  desc: string;
  calendarId: number;
}

export interface IEvent extends IEditingEvent {
  id: number;
}
export interface ICalendar {
  id: number;
  name: string;
  color: string;
}

export function getCalendarEndPoint(): Promise<ICalendar[]> {
  return fetch('http://localhost:8080/calendars').then((resp) => {
    return resp.json();
  });
}
export function getEventEndPoint(from: string, to: string): Promise<IEvent[]> {
  return fetch(
    `http://localhost:8080/events?date_gte=${from}&date_lte=${to}&_sort=date,time`
  ).then((resp) => {
    return resp.json();
  });
}
