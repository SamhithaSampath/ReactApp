import React, { useState, useEffect } from "react";
import { TextField, Typography, Grid } from "@mui/material";
import events from "../data/events.json";
import EventCalendar from "./EventCalendar";
import EventCard from "../components/EventCard";

const Events = () => {
  const [search, setSearch] = useState("");

  // Initialize state with data from localStorage (if available)
  const [registrations, setRegistrations] = useState(() => {
    const savedRegistrations = localStorage.getItem("registrations");
    return savedRegistrations ? JSON.parse(savedRegistrations) : 
      events.reduce((acc, event) => {
        acc[event.id] = event.registeredUsers;
        return acc;
      }, {});
  });

  // Save the registrations state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("registrations", JSON.stringify(registrations));
  }, [registrations]);

  // Filter events based on the search query
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase())
  );

  // Function to handle registration
  const handleRegister = (id) => {
    if (registrations[id] < events.find(event => event.id === id).maxAttendees) {
      setRegistrations(prev => ({
        ...prev,
        [id]: prev[id] + 1, // Increment registration for the event
      }));
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundImage: "url('https://wallpapers.com/images/hd/blue-pastel-background-1200-x-2133-0of62sjwos2rlzvy.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom align="center" style={{ color: "#3a5a8e" }}>
        Events
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search events..."
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        margin="normal"
        style={{ marginBottom: "20px" }}
      />

      {/* Calendar */}
      <EventCalendar />

      {/* Event Cards Grid */}
      <Typography variant="h5" gutterBottom align="center" style={{ marginTop: "20px", color: "#3a5a8e" }}>
        Event List
      </Typography>
      <Grid container spacing={3} justifyContent="center" style={{ marginTop: "20px" }}>
        {filteredEvents.length === 0 ? (
          <Typography variant="h6" color="textSecondary" align="center" style={{ color: "#3a5a8e" }}>
            No events found
          </Typography>
        ) : (
          filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <EventCard
                id={event.id}
                name={event.name}
                date={new Date(event.date).toLocaleDateString()} // Format date
                location={event.location}
                image={event.image}
                registeredUsers={registrations[event.id]}
                maxAttendees={event.maxAttendees}
                onRegister={handleRegister} // Pass down the registration handler
              />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Events;






