import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const ArticleList = ({ topic, articles, onArticleClick }) => {
  return (
    <Grid container spacing={3}>
      {articles.map((article, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card onClick={() => onArticleClick(article.id)} style={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant="h6">{article.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {article.description}
              </Typography>
              {/* Render the article image */}
              <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: 'auto' }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticleList;


