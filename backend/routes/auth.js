const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const JWT_SECRET_KEY = 'your_jwt_secret_key';

// Helper functions
const readUsersData = () => {
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeUsersData = (data) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  const users = readUsersData();
  if (users[email]) {
    return res.status(400).send('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, email, password: hashedPassword };
  
  users[email] = newUser;
  writeUsersData(users);
  
  res.status(201).send('User registered successfully');
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('All fields are required');
    }

    const users = readUsersData();
    const user = users[email];

    // Check if user exists
    if (!user) {
      return res.status(400).send('User not found');
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Create JWT token
    const token = jwt.sign({ email: user.email, username: user.username }, JWT_SECRET_KEY, { expiresIn: '1h' });

    // Send the token and username in the response
    res.json({ token, username: user.username });
});

  
module.exports = router;
