'use strict';

var express = require('express');
var controller = require('./goodreads.controller');

var router = express.Router();

router.get('/:asin', controller.index);

module.exports = router;
