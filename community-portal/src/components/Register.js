import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Grid } from "@mui/material";

const Register = ({ setToken, setUsername }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsernameState] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { email, password, username });
      setError('');
      setToken(response.data.token);
      setUsername(response.data.username);  // Store the username
      navigate('/');  // Redirect to home page after registration
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <Box sx={{
      backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/001/218/847/original/pastel-blue-water-color-background-vector.jpg)', // Your background image URL
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',  // Fix the background
      minHeight: '100vh',
      overflow: 'hidden', // Prevent scrolling on the page
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    }}>
      {/* Fixed Form Container */}
      <Box sx={{
        position: 'fixed', // Keep the form fixed
        top: '50%', // Center the form vertically
        left: '50%', // Center the form horizontally
        transform: 'translate(-50%, -50%)', // Offset the center alignment
        p: 6,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background for form
        textAlign: "center",
        paddingBottom: 6,
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
            src="https://static.vecteezy.com/system/resources/previews/003/177/413/original/welcome-sign-board-welcomes-concept-with-business-team-people-free-vector.jpg"
            alt="Register"
            style={{ width: '80%', maxWidth: 250, borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
          />
        </Box>

        <Typography variant="h4" color="primary" gutterBottom>
          Create an Account
        </Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsernameState(e.target.value)}
                required
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2', // Hover effect
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2', // Focus effect
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2', // Hover effect
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2', // Focus effect
                    },
                  },
                }}
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
                sx={{
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2', // Hover effect
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2', // Focus effect
                    },
                  },
                }}
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
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Register;

