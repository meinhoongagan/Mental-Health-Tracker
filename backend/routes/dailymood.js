// routes/dailyMood.js

const express = require('express');
const router = express.Router();
const DailyMood = require('../models/DailyMood');

// Create a new DailyMood entry
router.post('/dailyMood', async (req, res) => {
  try {
    const { userId, mood, description, notes } = req.body;
    const dailyMood = await DailyMood.create({ userId, mood, description, notes });
    res.status(201).json(dailyMood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all daily moods for a specific user
router.get('/users/:userId/dailyMood', async (req, res) => {
  try {
    const moods = await DailyMood.findAll({ where: { userId: req.params.userId } });
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
