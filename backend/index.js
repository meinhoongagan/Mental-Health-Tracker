const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const dailyMoodRoutes = require('./routes/dailymood');
const assistRoutes = require('./routes/assistance')
const bodyParser = require('body-parser');


// Use routes
app.use(userRoutes);
app.use(loginRoutes);
app.use(dailyMoodRoutes);
app.use(assistRoutes);

//Middlewares
app.use(bodyParser.json())
app.use(express.json())

// Set the server to listen on a specific port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});