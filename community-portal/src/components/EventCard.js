import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";

const EventCard = ({ id, name, date, location, image, registeredUsers, maxAttendees, onRegister }) => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const eventExpired = new Date(date) < new Date(); // Check if the event has expired
  const spotsAvailable = registeredUsers < maxAttendees; // Check if spots are available

  // Function to calculate time left for the countdown
  const calculateTimeLeft = () => {
    const now = new Date();
    const eventDate = new Date(date);
    const difference = eventDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    return "Event has started!";
  };

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  // Open the dialog
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle RSVP registration
  const handleRegister = () => {
    if (spotsAvailable) {
      onRegister(id); // Call onRegister from parent to update state
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Render for expired events
  if (eventExpired) {
    return (
      <Card sx={{ maxWidth: 345, margin: 2, opacity: 0.5 }}>
        <CardContent>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Event has passed
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: 2 }}>
        {image && <CardMedia component="img" height="140" image={image} alt={name} />}
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {new Date(date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {location}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            Registered: {registeredUsers}/{maxAttendees}
          </Typography>
          <Typography
            variant="body2"
            color={timeLeft.includes("Event has started!") ? "green" : "red"}
            sx={{ marginTop: "10px", fontWeight: "bold" }}
          >
            Countdown: {timeLeft}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickOpen}>
            Learn More
          </Button>
          {!eventExpired && spotsAvailable && (
            <Button size="small" color="secondary" onClick={handleRegister}>
              Click to register your interest
            </Button>
          )}
          {!spotsAvailable && <Typography variant="body2" color="error">Full</Typography>}
        </CardActions>
      </Card>

      {/* Modal (Dialog) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{name}</DialogTitle>
        <DialogContent>
          {image && <CardMedia component="img" height="140" image={image} alt={name} />}
          <Typography variant="h6">Date: {new Date(date).toLocaleString()}</Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>Location: {location}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Successfully registered!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EventCard;


