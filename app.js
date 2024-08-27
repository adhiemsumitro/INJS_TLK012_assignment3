const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const registerRoute = require(path.join(__dirname, 'routes/register'));
const todoRoute = require(path.join(__dirname, 'routes/todo'));

// Use routes
app.use('/register', registerRoute);
app.use('/todo', todoRoute);

// Start the server (you can comment this out during testing)
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

module.exports = app;
