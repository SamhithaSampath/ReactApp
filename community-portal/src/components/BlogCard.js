import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

const BlogCard = ({ blog }) => {
  if (!blog) {
    return <Typography>Blog data is unavailable.</Typography>;
  }

  const { title, author, content, imageUrl } = blog;

  return (
    <Card style={{ maxWidth: "300px", margin: "10px" }}>
      <CardContent>
        <Typography variant="h5">{title || "No Title"}</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          By {author || "Unknown Author"}
        </Typography>
        <Typography variant="body2">{content || "No content available."}</Typography>
        {imageUrl && (
          <CardMedia
            component="img"
            alt={title}
            height="140"
            image={imageUrl}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default BlogCard;



