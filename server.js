const express = require('express');
const bodyParser = require('body-parser');

// Create app
const app = express();

// Use middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Simple route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Todo app!!!'
  })
});

// Run server
app.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
