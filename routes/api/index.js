var express = require('express');
var router = express.Router();

require('./stories')(router);

module.exports = router;
