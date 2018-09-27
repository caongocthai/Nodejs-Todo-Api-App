const express = require('express');
const router = express.Router();

require('./todo.routes.js')(router);

module.exports = router;
