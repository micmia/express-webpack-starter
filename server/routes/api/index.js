const express = require('express');
const router = express.Router();

require('./stories')(router);
require('./users')(router);

module.exports = router;
