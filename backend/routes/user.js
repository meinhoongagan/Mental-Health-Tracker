// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user with an optional profile picture
router.post('/users', async (req, res) => {
  try {
    const { username, email, password, profilePicture } = req.body;
    const user = await User.create({ username, email, password, profilePicture });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user profile picture
router.put('/users/:id', async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const user = await User.update({ profilePicture }, { where: { id: req.params.id } });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
