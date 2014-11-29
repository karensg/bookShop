'use strict';

var key = "uv1J3LcJ7zGuhzCXwaCcUQ";
var secret = "QT7rbUZI5usLKYL24i5H1KrNJYN52cBpGRbPHNaVI";

var request = require('request');
var parseString = require('xml2js').parseString;


exports.index = function(req, res) {
  var asin = req.params.asin;
  var url = "http://www.goodreads.com/book/isbn?isbn="+asin+"&key="+key;

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      parseString(body, function (err, result) {
        res.json(result);
      });
    } else {
      res.json({});
    }
  })

};
