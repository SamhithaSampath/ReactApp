import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access the URL params
import { Typography, Container, Card, CardContent } from "@mui/material";
import articlesData from "../data/articles.json"; // Assuming you have the articles in a JSON file


const BlogDetail = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Loop through all topics to find the article with the matching id
    const foundArticle = Object.values(articlesData)
      .flat() // Flatten the array to iterate over all articles
      .find((article) => article.id === parseInt(id)); // Find the article with the matching id

    setArticle(foundArticle); // Set the article in state
  }, [id]); // Re-run the effect when the id changes

  if (!article) {
    return <Typography variant="h5">Article not found</Typography>; // Show a fallback message if the article is not found
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>{article.title}</Typography>
          <Typography variant="body1" paragraph>{article.content}</Typography>
          <Typography variant="body2" color="textSecondary">
            {article.description}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BlogDetail;

