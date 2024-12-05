import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to access the URL params
import { Grid, Card, CardContent, Typography } from "@mui/material";
import articlesData from "../data/articles.json"; // Assuming you have the articles in a JSON file

const ArticleDetail = () => {
  const { articleId } = useParams(); // Get the articleId from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Find the article with the matching articleId
    const foundArticle = Object.values(articlesData)
      .flat()
      .find((article) => article.id === parseInt(articleId));

    setArticle(foundArticle);
  }, [articleId]); // Re-run the effect when the articleId changes

  if (!article) {
    return <Typography variant="h5">Article not found</Typography>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h4">{article.title}</Typography>
            <Typography variant="body1" paragraph>
              {article.content} {/* Display the full content of the article */}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {article.description} {/* Optional: Show the description or additional info */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ArticleDetail;








