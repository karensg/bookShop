var soap = require('soap');

var url = 'http://localhost:8000/bank.wsdl';
var args = {
  USD: 250,
  accountNumber: 1234567890123456,
  accountName: 'Karens Grigorjancs',
  expirationDate: '11/16',
  securityNumber: 123,
  resellerName: 'Aalto Book Shop',
  resellerAuthCode: '7c5f16df18e3ad3e8946290b0eb193cc'
};
soap.createClient(url, function(err, client) {
    client.makePayment(args, function(err, result) {
        console.log(result);
    });
});
