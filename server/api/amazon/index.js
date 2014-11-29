'use strict';

var express = require('express');
var controller = require('./amazon.controller');

var router = express.Router();

router.get('/search/:keywords', controller.search);
router.get('/book/:id', controller.book);

module.exports = router;
