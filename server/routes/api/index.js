const express = require('express');
const router = express.Router();

require('./stories')(router);

module.exports = router;
