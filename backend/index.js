const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

// Import routes
const userRoutes = require('./routes/user');
const dailyMoodRoutes = require('./routes/dailymood');
const assistRoutes = require('./routes/assistance')

// Use routes
app.use(userRoutes);
app.use(dailyMoodRoutes);
app.use(assistRoutes);

// Set the server to listen on a specific port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});