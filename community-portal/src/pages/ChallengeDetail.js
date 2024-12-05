import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import challengesData from "../data/challenges.json";
import { Typography, Card, CardContent, TextField, Button, List, ListItem, ListItemText, CardMedia } from "@mui/material";

const ChallengeDetail = () => {
  const { id } = useParams();
  const challenge = challengesData.find((ch) => ch.id === parseInt(id));

  const commentsKey = `comments_${id}`; // Unique key for each challenge's comments in local storage
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Load comments from local storage on component mount
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(commentsKey)) || [];
    setComments(savedComments);
  }, [commentsKey]);

  const [status, setStatus] = useState(localStorage.getItem(`challenge_status_${id}`) || "In Progress");

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    localStorage.setItem(`challenge_status_${id}`, newStatus); // Save to local storage
  };

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const updatedComments = [...comments, comment];
      setComments(updatedComments);
      setComment(""); // Clear the input field
      localStorage.setItem(commentsKey, JSON.stringify(updatedComments)); // Save to local storage
    }
  };

  if (!challenge) {
    return <Typography variant="h5">Challenge not found.</Typography>;
  }

  const { title, description, date, difficulty, rules, deadline, challenges_faced, media } = challenge;

  return (
    <div style={{ padding: "20px" }}>
      <Card>
        <CardContent>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body1" paragraph>{description}</Typography>
          <Typography variant="body2">Date: {date}</Typography>
          <Typography variant="body2">Difficulty: {difficulty}</Typography>
          <Typography variant="body1" paragraph>Rules: {rules}</Typography>
          <Typography variant="body1" paragraph>Deadline: {deadline}</Typography>
          <Typography variant="body1" paragraph>Challenges faced by participants: {challenges_faced}</Typography>

          {/* Media Section - Video */}
          {media?.video && media.video.includes('v=') ? (
            <div style={{ marginTop: "20px" }}>
              <Typography variant="h6">Tutorial Video</Typography>
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${media.video.split('v=')[1]?.split('&')[0]}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No video available for this challenge.
            </Typography>
          )}

          {media?.downloadableResource && (
            <div style={{ marginTop: "20px" }}>
              <Typography variant="h6">Downloadable Resource</Typography>
              <Button href={media.downloadableResource} target="_blank" variant="contained">
                Download Resource
              </Button>
            </div>
          )}

          {/* Completion Status */}
          <Typography variant="h6" paragraph style={{ marginTop: "20px" }}>
            Status: {status}
          </Typography>
          <Button
            onClick={() => handleStatusChange(status === "Completed" ? "In Progress" : "Completed")}
            variant="contained"
            color={status === "Completed" ? "success" : "secondary"}
          >
            {status === "Completed" ? "Mark In Progress" : "Mark Completed"}
          </Button>

          {/* Comment Section */}
          <Typography variant="h6" paragraph style={{ marginTop: "20px" }}>
            Share Your Experience
          </Typography>
          <TextField
            label="Your Comment"
            multiline
            rows={4}
            fullWidth
            value={comment}
            onChange={handleCommentChange}
            variant="outlined"
          />
          <Button
            onClick={handleCommentSubmit}
            style={{ marginTop: "10px" }}
            variant="contained"
          >
            Submit Comment
          </Button>

          {/* Display Submitted Comments */}
          <Typography variant="h6" paragraph style={{ marginTop: "20px" }}>
            Comments
          </Typography>
          {comments.length === 0 ? (
            <Typography variant="body1">No comments yet. Be the first to share!</Typography>
          ) : (
            <List>
              {comments.map((cmt, index) => (
                <ListItem key={index}>
                  <ListItemText primary={cmt} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeDetail;







