import React, { useEffect, useState } from "react";
import { Typography, Grid, Card, CardContent, CardMedia, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { AccessAlarm, Event, TrendingUp } from '@mui/icons-material'; // Importing Icons
import { useSpring, animated } from 'react-spring'; // For animation
import FeaturedBlogs from "../components/FeaturedBlogs";
import ChallengeCard from "../components/ChallengeCard";
import challengesData from "../data/challenges.json";
import eventsData from "../data/events.json";

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setChallenges(challengesData);
    setEvents(eventsData);

    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const upcomingChallenges = challenges.filter((challenge) => {
    const challengeDate = new Date(challenge.date);
    challengeDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    return challengeDate > currentDate;
  });

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    return eventDate > currentDate;
  });

  const calculateCountdown = (eventDate) => {
    const now = new Date();
    const timeDifference = new Date(eventDate) - now;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Animation for text appearance
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/001/218/847/original/pastel-blue-water-color-background-vector.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "40px 20px",
        color: "#4B4B4B", // Default text color
      }}
    >
      {/* Welcome Section */}
      <animated.div style={fadeIn}>
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          style={{ fontWeight: "bold", color: "#5A3E8B" }} // Lavender color
        >
          Welcome to MindfulPath
        </Typography>
        <Typography
          variant="h6"
          align="center"
          paragraph
          style={{ fontStyle: "italic", maxWidth: "800px", margin: "0 auto", color: "#6B728E" }} // Warm lavender
        >
          Embark on a journey of mindfulness, wellness, and spiritual growth. Explore blogs, challenges, and events that
          nurture your mind, body, and soul. Join the community and engage in meaningful conversations and activities.
        </Typography>
      </animated.div>

      {/* Featured Blogs Section */}
      <Box sx={{ marginTop: "40px" }}>
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontWeight: "bold", color: "#3a5a8e" }} // Soft teal
        >
          Featured Blogs
        </Typography>
        <div className="featured-blogs">
          <FeaturedBlogs />
        </div>
      </Box>

      {/* Upcoming Challenges Section */}
      <Typography
        variant="h4"
        gutterBottom
        style={{ marginTop: "40px", fontWeight: "bold", color: "#3a5a8e" }} // Muted gold
      >
        <TrendingUp style={{ verticalAlign: 'middle', marginRight: '8px' }} />
        Upcoming Challenges
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {upcomingChallenges.map((challenge) => (
          <Grid item xs={12} sm={6} md={4} key={challenge.id}>
            <Link to={`/challenges/${challenge.id}`} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  boxShadow: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 10,
                  },
                  backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
                }}
              >
                <ChallengeCard challenge={challenge} />
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Upcoming Events Section */}
      <Typography
        variant="h4"
        gutterBottom
        style={{ marginTop: "40px", fontWeight: "bold", color: "#3a5a8e" }} // Light olive green
      >
        <Event style={{ verticalAlign: 'middle', marginRight: '8px' }} />
        Upcoming Events
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {upcomingEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card
              sx={{
                boxShadow: 3,
                backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 10,
                },
              }}
            >
              <CardMedia
                component="img"
                alt={event.name}
                height="200"
                image={event.image}
                sx={{ borderRadius: 2 }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  style={{ fontWeight: "bold", color: "#4B4B4B" }} // Charcoal gray
                >
                  {event.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date: {new Date(event.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {event.location}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  style={{ fontWeight: "bold", color: "#FA8072" }} // Soft coral
                >
                  Countdown: {calculateCountdown(event.date)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;





  



