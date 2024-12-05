import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const TopicList = ({ topics, onSelectTopic }) => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Explore Topics
      </Typography>
      <List>
        {topics.map((topic) => (
          <ListItem button key={topic} onClick={() => onSelectTopic(topic)}>
            <ListItemText primary={topic} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TopicList;



