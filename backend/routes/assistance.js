const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();
const dailyMood = require("../models/dailymoodModel");

router.get("/assist/:userId", async (req, res) => {
  try {
    const data = await dailyMood.findAll({
      where: { userId: req.params.userId },
    });
    if (!data || data.length === 0) {
        return res.status(400).json(res); // Use the response defined earlier
      }
    //   res.status(200).json("data is " + data);
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `data=${data} "given you the data and you need to create the mental health report for the end user this message will directly will show to end user so please do not write any other jargon be quick precise on the point and please create a minimal report by this information" `;
    const result = await model.generateContent(prompt);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router