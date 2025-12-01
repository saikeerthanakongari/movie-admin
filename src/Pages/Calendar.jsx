import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Movie Premiere',
    start: new Date(2025, 10, 29, 10, 0), // Note: Month is 0-indexed (10 = Nov)
    end: new Date(2025, 10, 29, 12, 0),
  },
  {
    title: 'Team Meeting',
    start: new Date(2025, 10, 30, 14, 0),
    end: new Date(2025, 10, 30, 15, 0),
  },
];

const Calendar = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-[600px] dark:text-gray-200">
      <h2 className="text-xl font-bold mb-4">Event Calendar</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        className="dark:text-gray-400"
      />
    </div>
  );
};

export default Calendar;