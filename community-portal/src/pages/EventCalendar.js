import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../styles/calendar.css"; // Import custom styles

// Import events data
import events from "../data/events.json";

const EventCalendar = () => {
  const localizer = momentLocalizer(moment);

  // Map events data to calendar format
  const calendarEvents = events.map((event) => ({
    title: event.name,
    start: new Date(event.date),
    end: new Date(event.date), // For single-day events, start and end are the same
    location: event.location,
  }));

  // Handle event click
  const handleEventClick = (event) => {
    alert(`Event: ${event.title}\nLocation: ${event.location}\nDate: ${moment(event.start).format("LL")}`);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Event Calendar</h2>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={handleEventClick}
      />
    </div>
  );
};

export default EventCalendar;
