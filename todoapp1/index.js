const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

// Initialize app
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
