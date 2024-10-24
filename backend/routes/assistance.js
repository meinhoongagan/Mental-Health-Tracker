const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();
const dailyMood = require("../models/dailymoodModel");

router.get("/assist/:userId", async (req, res) => {
  try {
    const data = await dailyMood.findAll({
      where: { userId: req.params.userId },
      order: [['createdAt', 'DESC']], // Get most recent entries first
    });

    if (!data || data.length === 0) {
      return res.status(400).json({ error: "No mood data found for this user" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create a structured analysis request
    const prompt = `
    As a mental health assistant, analyze this user's mood data and create a concise, empathetic report. Focus on patterns, trends, and actionable insights.

    Key points to address:
    1. Overall mood patterns and changes
    2. Sleep and exercise habits
    3. Stress levels and triggers
    4. Effective coping mechanisms
    5. Areas that might need attention
    6. Positive aspects to maintain

    Raw data: ${JSON.stringify(data)}

    Create a brief, clear report for the user that highlights key insights and offers gentle suggestions for improvement where needed. Keep the tone supportive and constructive.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;

    // Format the response for the client
    const formattedResponse = {
      report: response.candidates[0].content.parts[0].text,
      generatedAt: new Date().toISOString(),
      dataPoints: data.length,
      periodCovered: {
        start: data[data.length - 1].createdAt,
        end: data[0].createdAt
      }
    };

    res.status(200).json(formattedResponse);
  } catch (err) {
    console.error("Error in mental health assist:", err);
    res.status(500).json({ 
      error: "Failed to generate mental health report",
      details: err.message 
    });
  }
});

// Add a route to get summary statistics
router.get("/assist/:userId/stats", async (req, res) => {
  try {
    const data = await dailyMood.findAll({
      where: { userId: req.params.userId },
      order: [['createdAt', 'ASC']]
    });

    if (!data || data.length === 0) {
      return res.status(400).json({ error: "No mood data found for this user" });
    }

    // Calculate summary statistics
    const stats = {
      totalEntries: data.length,
      averageSleepHours: calculateAverage(data.map(d => d.sleepHours)),
      moodDistribution: calculateMoodDistribution(data),
      exerciseFrequency: calculatePercentage(data.filter(d => d.exercise).length, data.length),
      commonTags: findMostCommonItems(data.flatMap(d => d.tags)),
      commonCopingMechanisms: findMostCommonItems(data.flatMap(d => d.copingMechanisms)),
      averageStressLevel: calculateStressLevel(data),
      periodCovered: {
        start: data[0].createdAt,
        end: data[data.length - 1].createdAt
      }
    };

    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper functions for statistics
function calculateAverage(numbers) {
  return numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
}

function calculateMoodDistribution(data) {
  const distribution = {};
  data.forEach(entry => {
    distribution[entry.mood] = (distribution[entry.mood] || 0) + 1;
  });
  return distribution;
}

function calculatePercentage(part, total) {
  return (part / total) * 100;
}

function findMostCommonItems(items) {
  const frequency = {};
  items.forEach(item => {
    frequency[item] = (frequency[item] || 0) + 1;
  });
  return Object.entries(frequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
}

function calculateStressLevel(data) {
  const stressLevels = {
    'low': 1,
    'moderate': 2,
    'high': 3,
    'extreme': 4
  };
  const average = calculateAverage(data.map(d => stressLevels[d.stressLevel] || 0));
  return Object.keys(stressLevels).find(key => stressLevels[key] >= average) || 'moderate';
}

module.exports = router;