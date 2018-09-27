const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var cors = require('cors')

// Create app
const app = express();

// Use middleware
app.use(cors());
app.use(morgan('short'));
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

// SOCKET
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a client connected', socket.id, '\n');

  socket.on('create-todo', (data) => {
    console.log('client send todo...', socket.id, data, '\n');
    setTimeout(() => {
      io.emit('reload-todos', data);
    }, 50);
  });

  socket.on('delete-todo', (data) => {
    console.log('client delete todo...', socket.id, data, '\n');
    setTimeout(() => {
      io.emit('reload-todos', data);
    }, 50);
  });

  socket.on('disconnect', () => {
    console.log('client disconnect...', socket.id, '\n');
  });

  socket.on('error', (err) => {
    console.log('received error from client:', socket.id, '\n');
    console.log(err)
  });
});

// Run server
const port = process.env.PORT || 8080;
http.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
