const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();
const dailyMood = require("../models/dailymoodModel");

router.get("/assist/:userId", async (req, res) => {
  try {
    const data = await getData(req.params.userId);
    validateData(data);

    const model = createModel();

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

    const result = getResult(model, prompt);
    const response = result.response;

    // Format the response for the client
    const formattedResponse = {
      report: response.candidates[0].content.parts[0].text,
      generatedAt: new Date().toISOString(),
      dataPoints: data.length,
      periodCovered: {
        start: data[data.length - 1].createdAt,
        end: data[0].createdAt,
      },
    };

    res.status(200).json(formattedResponse);
  } catch (err) {
    console.error("Error in mental health assist:", err);
    res.status(500).json({
      error: "Failed to generate mental health report",
      details: err.message,
    });
  }
});

// Add a route to get summary statistics
router.get("/assist/:userId/stats", async (req, res) => {
  try {
    const data = getData(req.params.userId);

    validateData(data);

    // Calculate summary statistics
    const stats = {
      totalEntries: data.length,
      averageSleepHours: calculateAverage(data.map((d) => d.sleepHours)),
      moodDistribution: calculateMoodDistribution(data),
      exerciseFrequency: calculatePercentage(
        data.filter((d) => d.exercise).length,
        data.length
      ),
      commonTags: findMostCommonItems(data.flatMap((d) => d.tags)),
      commonCopingMechanisms: findMostCommonItems(
        data.flatMap((d) => d.copingMechanisms)
      ),
      averageStressLevel: calculateStressLevel(data),
      periodCovered: {
        start: data[0].createdAt,
        end: data[data.length - 1].createdAt,
      },
    };

    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/assist/:userId/copingstrategies", async (req, res) => {
  try {
    const data = await getData(req.params.userId);
    validateData(data);
    const model = createModel();
    const prompt = `
Given the following user data, generate personalized coping strategies to help them manage their mental health. Use insights from the data, such as recent mood patterns, stressors, and daily activities, to suggest both quick relief techniques and sustainable long-term coping strategies.

User Data:
${JSON.stringify(data, null, 2)}

Format the response as a list:
- Coping Strategy: Include a brief, clear description for each suggestion.
- Explanation: Provide context on why this strategy could help the user based on their data.
`;
    const result = await getResult(model, prompt);
    const response = result.response;
    console.log(response);
    console.log(result);
    
    const formattedResponse = {
      copingStrategies: response.candidates[0].content.parts[0].text,
      generatedAt: new Date().toISOString(),
    };
    res.status(200).json(formattedResponse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/assist/:userId/suggestresources", async (req, res) => {
  try {
    const data = await getData(req.params.userId);
    validateData(data);
    const model = createModel();
    // Constructing the prompt
const prompt = `
Given the following user data, recommend a list of articles, podcasts, or videos that would be beneficial for the user. The resources should focus on mental wellness, mindfulness, and stress management, and be aligned with the user's current mental health state.

User Data:
${JSON.stringify(data, null, 2)}

Format the recommendations as a list:
- Resource Title: Include the name of the article, podcast, or video.
- Type: Specify if it is an article, podcast, or video.
- Description: Briefly describe the content and how it can help the user based on their mental health state.
`;

    const result = await getResult(model, prompt);
    const response = result.response;
    console.log(response);
    console.log(result);
    
    const formattedResponse = {
      suggestResources: response.candidates[0].content.parts[0].text,
      generatedAt: new Date().toISOString(),
    };
    res.status(200).json(formattedResponse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/assist/:userId/exercises", async (req, res) => {
  try {
    const data = await getData(req.params.userId);
    validateData(data);
    const model = createModel();
    // Constructing the prompt
    const prompt = `
    Given the user's current mental state, provide a list of mindfulness and meditation exercises tailored to help them manage stress or anxiety. Each exercise should include a brief description, duration, and instructions on how to perform it. Focus on techniques that promote relaxation and grounding, such as breathing exercises, body scans, and guided meditation.
    
    User Data:
    ${JSON.stringify(data, null, 2)}
    
    Format the recommendations as a list:
    - Exercise Name: Name of the exercise (e.g., "5-Minute Deep Breathing").
    - Type: Specify if it is a mindfulness exercise, meditation, or breathing exercise.
    - Duration: Suggested time for completing the exercise.
    - Instructions: Step-by-step guidance to perform the exercise, focusing on reducing stress or anxiety.
    - Benefits: Briefly explain how this exercise can help alleviate the user's current state.
    `;
  
    const result = await getResult(model, prompt);
    const response = result.response;
    
    const formattedResponse = {
      suggestExercises: response.candidates[0].content.parts[0].text,
      generatedAt: new Date().toISOString(),
    };
    res.status(200).json(formattedResponse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Route for Chat
router.post("/assist/chat", async (req, res) => {
  try {
    const model = createModel(); // If `createModel` is a function, invoke it
    
    const prompt = `
    Context: ${req.body.context || "No prior context available"}
    User Message: ${req.body.message}
    
    Instructions:
    Respond to the user's message based on the context provided. If there is relevant context, consider it to give a meaningful and coherent response. If no context is provided or it is irrelevant, respond solely to the user's message. Keep your response concise and clear.
    `;
    
    if (!prompt) {
      return res.status(400).json({ error: "Message prompt is required" });
    }

    const result = await getResult(model, prompt);

    // Safely access response structure with checks
    const response = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!response) {
      return res.status(500).json({ error: "Unexpected response format from model" });
    }
    res.status(200).json({ message: response });
  } catch (err) {
    console.error("Chat route error:", err); // Log the error for debugging
    res.status(500).json({ error: err.message });
  }
});


// Function for GoogleGenAi
function createModel() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}
async function getResult(model, prompt) {
  return await model.generateContent(prompt);
}

// Function to get Data
async function getData(id) {
  const data = await dailyMood.findAll({
    where: { userId: id },
    order: [["createdAt", "DESC"]], // Get most recent entries first
  });
  return data;
}
function validateData(data) {
  if (!data || data.length === 0) {
    return res.status(400).json({ error: "No mood data found for this user" });
  }
}

// Helper functions for statistics
function calculateAverage(numbers) {
  return numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
}

function calculateMoodDistribution(data) {
  const distribution = {};
  data.forEach((entry) => {
    distribution[entry.mood] = (distribution[entry.mood] || 0) + 1;
  });
  return distribution;
}

function calculatePercentage(part, total) {
  return (part / total) * 100;
}

function findMostCommonItems(items) {
  const frequency = {};
  items.forEach((item) => {
    frequency[item] = (frequency[item] || 0) + 1;
  });
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
}

function calculateStressLevel(data) {
  const stressLevels = {
    low: 1,
    moderate: 2,
    high: 3,
    extreme: 4,
  };
  const average = calculateAverage(
    data.map((d) => stressLevels[d.stressLevel] || 0)
  );
  return (
    Object.keys(stressLevels).find((key) => stressLevels[key] >= average) ||
    "moderate"
  );
}

module.exports = router;


