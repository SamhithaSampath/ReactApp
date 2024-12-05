import React, { useState } from "react";
import ChallengeCard from "../components/ChallengeCard";
import challenges from "../data/challenges.json";
import { TextField, Select, MenuItem, InputLabel, FormControl, Typography, Grid } from "@mui/material";

const Challenges = () => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");

  // Set current date to midnight (start of the day) for comparison
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Normalize the current date to midnight (no time component)

  // Filter challenges based on the search query and selected difficulty
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.description.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficulty ? challenge.difficulty === difficulty : true;
    return matchesSearch && matchesDifficulty;
  });

  // Separate upcoming and past challenges
  const upcomingChallenges = filteredChallenges.filter(challenge => {
    const challengeDate = new Date(challenge.date);
    challengeDate.setHours(0, 0, 0, 0); // Normalize challenge date to midnight (no time component)
    return challengeDate > currentDate; // Future challenges (strictly after today)
  });

  const pastChallenges = filteredChallenges.filter(challenge => {
    const challengeDate = new Date(challenge.date);
    challengeDate.setHours(0, 0, 0, 0); // Normalize challenge date to midnight (no time component)
    return challengeDate <= currentDate; // Past challenges (including today)
  });

  return (
    <div
      style={{
        padding: '20px',
        backgroundImage: `url('https://wallpapers.com/images/hd/blue-pastel-background-1200-x-2133-0of62sjwos2rlzvy.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h3" gutterBottom style={{ color: '#3a5a8e' }}>
        Challenges
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search challenges"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      {/* Difficulty Filter */}
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Filter by Difficulty</InputLabel>
        <Select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          label="Filter by Difficulty"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>

      {/* Upcoming Challenges Section */}
      <Typography variant="h5" gutterBottom style={{ color: '#3a5a8e' }}>
        Upcoming Challenges
      </Typography>
      <Grid container spacing={3}>
        {upcomingChallenges.map((challenge) => (
          <Grid item xs={12} sm={6} md={4} key={challenge.id}>
            <ChallengeCard challenge={challenge} />
          </Grid>
        ))}
      </Grid>

      {/* Past Challenges Section */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '40px', color: '#3a5a8e' }}>
        Past Challenges
      </Typography>
      <Grid container spacing={3}>
        {pastChallenges.map((challenge) => (
          <Grid item xs={12} sm={6} md={4} key={challenge.id}>
            <ChallengeCard challenge={challenge} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Challenges;





