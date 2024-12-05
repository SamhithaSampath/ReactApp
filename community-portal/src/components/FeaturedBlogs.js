import React from "react";
import blogs from "../data/blogs.json"; // Import blog data
import BlogCard from "./BlogCard"; // Reuse BlogCard component
import { Typography } from "@mui/material"; // Import Typography from Material-UI
import { Link } from "react-router-dom"; // Import Link for navigation

const FeaturedBlogs = () => {
  // Filter out the featured blogs from the data
  const featuredBlogs = Array.isArray(blogs) ? blogs.filter(blog => blog.isFeatured) : [];

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {featuredBlogs.length > 0 ? (
          featuredBlogs.map((blog) => (
            <Link 
              to={`/blog/${blog.id}`} 
              key={blog.id} 
              style={{ textDecoration: 'none' }} // Remove underline for better UI
            >
              <BlogCard blog={blog} />
            </Link>
          ))
        ) : (
          <Typography>No featured blogs available.</Typography>
        )}
      </div>
    </div>
  );
};

export default FeaturedBlogs;




