Dear fellow student,

Here are some tips and tricks to get you started.

First steps:
1. Install nodejs
2. run: npm install

To start the server:
1. run: node server

To run the soap client:
1. run: node soapClient

To run the rest client:
1. run: node restClient

If you know PostMan, I included a collection of REST requests you can experiment with.

I made some restrictions for the values (function processPayment in server.js)
- USD < 250.34. Our user does not have more money than that.
- accountNumber.length = 16
- securityNumber.length = 3

Good luck!
