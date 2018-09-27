const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Create app
const app = express();

// Use middleware
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DATABASE
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Successfully connected to the database');
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// Simple route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Todo app!!!'
  })
});

// Routes
const router = require('./app/routes');
app.use(router);

// Run server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server is listening on port 8080');
});
