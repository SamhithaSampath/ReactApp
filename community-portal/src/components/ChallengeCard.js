import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from "@mui/material";

const ChallengeCard = ({ challenge }) => {
  // Use useState before any conditional rendering
  const [status, setStatus] = useState(localStorage.getItem(`challenge_status_${challenge?.id}`) || "In Progress");

  // Early return if challenge is not provided
  if (!challenge) {
    return <Typography>Challenge data is unavailable.</Typography>;
  }

  const { id, title, description, difficulty, date, media } = challenge;

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    localStorage.setItem(`challenge_status_${id}`, newStatus); // Save to local storage
  };

  return (
    <Link to={`/challenges/${id}`} style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
        <CardMedia
          component="img"
          height="200"
          image={media?.image || "default-image-url.jpg"} // Default image if none is provided
          alt="Challenge image"
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            {title || "No Title"}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {description || "No description available."}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Difficulty: {difficulty || "Unknown Difficulty"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date: {date || "Unknown Date"}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Take Challenge
          </Button>
          <Button
            size="small"
            color={status === "Completed" ? "success" : "secondary"}
            onClick={() => handleStatusChange(status === "Completed" ? "In Progress" : "Completed")}
          >
            {status === "Completed" ? "Mark In Progress" : "Mark Completed"}
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default ChallengeCard;





