import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Optional: Menu Icon for mobile view */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        {/* Logo or Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Community Portal
        </Typography>
        {/* Navigation links */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/blogs">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/challenges">
          Challenges
        </Button>
        <Button color="inherit" component={Link} to="/events">
          Events
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

