import React from 'react';
import { Typography, Container, Grid } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Typography variant="body2" color="textSecondary" align="center">
              © 2024 Community Portal
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
