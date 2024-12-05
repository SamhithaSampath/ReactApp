import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom"; // Just use Routes and Route
import { AppBar, Toolbar, Button, Typography, Container } from "@mui/material";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Challenges from "./pages/Challenges";
import Events from "./pages/Events";

import FeaturedBlogs from "./components/FeaturedBlogs"; // Your FeaturedBlogs component
import BlogDetail from "./pages/BlogDetail"; // The new BlogDetail component
import ChallengeDetail from "./pages/ChallengeDetail"; // Adjust the path if necessary
import ArticleDetail from './pages/ArticleDetail';
import Register from './components/Register';  // Add Register import
import Login from './components/Login';  // Add Login import

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Get token from localStorage
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); // Get username from localStorage
  const navigate = useNavigate(); // Navigation hook to redirect after login

  const handleLogout = () => {
    // Clear the token and username from localStorage and state
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken('');
    setUsername('');
    navigate("/login");  // Redirect to the login page on logout
  };

  return (
    <div className="app">
      {/* AppBar for top navigation */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Community Portal
          </Typography>

          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/blogs">Blogs</Button>
          <Button color="inherit" component={Link} to="/challenges">Challenges</Button>
          <Button color="inherit" component={Link} to="/events">Events</Button>

          {/* Conditionally render login/logout button */}
          {token ? (
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button> {/* Register Link */}
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Main content area */}
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenges/:id" element={<ChallengeDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/register" element={token ? <Home /> : <Register setToken={setToken} />} />
          <Route path="/login" element={token ? <Home /> : <Login setToken={setToken} setUsername={setUsername} />} />
        </Routes>
      </Container>
    </div>
  );
};


export default App;























