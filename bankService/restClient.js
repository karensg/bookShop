var querystring = require('querystring');
var http = require('http');

// Configure the data to send
var args = {
  EUR: 250,
  accountNumber: 1234567890123456,
  accountName: 'Karens Grigorjancs',
  expirationDate: '11/16',
  securityNumber: 123,
  resellerName: 'Aalto Book Shop',
  resellerAuthCode: '7c5f16df18e3ad3e8946290b0eb193cc'
};
var post_data = querystring.stringify(args);

// Set up the Post options
var post_options = {
  host: 'localhost',
  port: '8000',
  path: '/rest',
  method: 'POST',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': post_data.length
  }
};

// Set up the request
var post_req = http.request(post_options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (answer) {
      console.log(answer);
  });
});

// Post the data
post_req.write(post_data);
post_req.end();
