var http = require('http');
var soap = require('soap');
var fs = require('fs');
var qs = require('querystring');

// Application logic
var processPayment = function(args) {

  // Helper function: check if not integer
  console.log(args);
  var notInt = function (a) {
    return a != parseInt(a, 10);
  };
  var notFloat = function (a) {
    return a != parseFloat(a);
  };

  // Perform some checks to test with a bad response
  if(notFloat(args.USD) || args.USD < 0) {
    return { paymentCompleted: false, message: 'The amount is not valid'};
  }
  if (notInt(args.accountNumber) || args.accountNumber.toString().length != 16) {
    return { paymentCompleted: false, message: 'The account number is not valid.'};
  }
  if (notInt(args.securityNumber) || args.securityNumber.toString().length != 3) {
    return { paymentCompleted: false, message: 'The security number is not valid.'};
  }
  if (args.USD > 250.34) {
    return { paymentCompleted: false, message: 'Not enough money on the account'};
  }

  // Everything is okay
  return { paymentCompleted: true, message: 'Transfer '+args.USD+'$ from account: '+args.accountNumber+', to account: '+args.resellerName};
};

// Bank Service
var BankService = {
    Bank_Service: {
        Bank_Port: {
            makePayment: processPayment
          }
    }
};

var filePath = 'bank.wsdl';
var xml = fs.readFileSync(filePath, 'utf8');
var endpoint = '/wsdl';

// Start a server
var server = http.createServer(function(request,response) {
  // Serve the wsdl file
  if(request.url=='/bank.wsdl') {
    var stat = fs.statSync(filePath);
    response.writeHead(200, {
        'Content-Type': 'text/xml',
        'Content-Length': stat.size
    });
    var readStream = fs.createReadStream(filePath);
    readStream.pipe(response);
  }

  // Take care of REST API
  else if (request.url=='/rest' && request.method == 'POST') {
    var body = '';
    // Save POST variables
    request.on('data', function (data) {
          body += data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        var payment = processPayment(post);
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 201;
        response.write(JSON.stringify(payment));
        response.end();
    });
  }

  // Return 404:
  else {
    response.statusCode = 404;
    response.end('404: Not Found: ' + request.url);
  }

});

server.listen(8000);

// Set up a SOAP server
soap.listen(server, endpoint, BankService, xml);
console.log('Server started successfully.');
