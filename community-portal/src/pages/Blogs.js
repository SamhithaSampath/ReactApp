import React, { useState } from "react";
import TopicList from "../components/TopicList";
import ArticleList from "../components/ArticleList";
import { useNavigate } from 'react-router-dom';
import articlesData from "../data/articles.json";
import { TextField } from "@mui/material";

const Blogs = () => {
  const allTopics = Object.keys(articlesData); // Get all topics from the JSON
  const [searchTopic, setSearchTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchArticle, setSearchArticle] = useState("");
  const navigate = useNavigate(); // Updated to useNavigate

  // Filter topics based on the topic search input
  const filteredTopics = allTopics.filter((topic) =>
    topic.toLowerCase().includes(searchTopic.toLowerCase())
  );

  // Handle topic selection
  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
    setSearchArticle(""); // Clear article search when a new topic is selected
  };

  // Filter articles within the selected topic
  const filteredArticles =
    selectedTopic && searchArticle
      ? articlesData[selectedTopic].filter((article) =>
          article.title.toLowerCase().includes(searchArticle.toLowerCase())
        )
      : selectedTopic
      ? articlesData[selectedTopic]
      : null;

  // Handle article click, navigate to the article detail page
  const handleArticleClick = (articleId) => {
    navigate(`/blog/${articleId}`); // Updated to use navigate
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://wallpapers.com/images/hd/blue-pastel-background-1200-x-2133-0of62sjwos2rlzvy.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      {selectedTopic ? (
        <div>
          {/* Search Bar for Articles */}
          <TextField
            label="Search articles..."
            variant="outlined"
            fullWidth
            value={searchArticle}
            onChange={(e) => setSearchArticle(e.target.value)}
            margin="normal"
          />
          <ArticleList
            topic={selectedTopic}
            articles={filteredArticles}
            onArticleClick={handleArticleClick} // Pass the click handler
          />
        </div>
      ) : (
        <div>
          {/* Search Bar for Topics */}
          <TextField
            label="Search topics..."
            variant="outlined"
            fullWidth
            value={searchTopic}
            onChange={(e) => setSearchTopic(e.target.value)}
            margin="normal"
          />
          <TopicList topics={filteredTopics} onSelectTopic={handleSelectTopic} />
        </div>
      )}
    </div>
  );
};

export default Blogs;













