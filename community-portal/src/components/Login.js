import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Grid } from "@mui/material";

// Define the animation style
const useStyles = () => ({
  welcomeMessage: {
    animation: 'popup 1s ease-out', // Apply the popup animation
    '@keyframes popup': {
      '0%': {
        opacity: 0,
        transform: 'scale(0.5)', // Start from small size and invisible
      },
      '100%': {
        opacity: 1,
        transform: 'scale(1)', // End at normal size and visible
      }
    }
  },
});

const Login = ({ setToken, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const classes = useStyles(); // Apply the animation styles

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setError('');
      setToken(response.data.token);
      setUsername(response.data.username);  // Store the username
      navigate('/');  // Redirect to home page after login
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Box sx={{
      backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/001/218/847/original/pastel-blue-water-color-background-vector.jpg)', // Your background image URL
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed', // Fix the background
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      margin: 0,
      padding: 0,
    }}>
      {/* Fixed Form Container */}
      <Box sx={{
        position: 'fixed', // Keep the form fixed
        top: '50%', // Center the form vertically
        left: '50%', // Center the form horizontally
        transform: 'translate(-50%, -50%)', // Offset the center alignment
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background for form
        textAlign: "center",
        paddingBottom: 5,
        zIndex: 1, // Ensure the form stays above the background
      }}>
        {/* Image Above Form */}
        <Box sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <img
            src="https://media.istockphoto.com/id/1186915680/vector/meditation-concept-illustration.jpg?s=170667a&w=0&k=20&c=A13EIKzn403zN0BxpkeMl9CmVgmpChSCJlO9ZHGfXjQ="
            alt="Login"
            style={{ width: '80%', maxWidth: 250, borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
          />
        </Box>

        {/* Animated Welcome Message */}
        <Typography variant="h4" color="primary" gutterBottom className={classes.welcomeMessage}>
          Welcome Back!
        </Typography>
        
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  padding: "12px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  '&:hover': { backgroundColor: '#1976d2' },
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Login;






