'use strict';

var soap = require('soap');

// Get list of orders
exports.index = function(req, res) {

  // Own bank
  if(req.body.bank.Type == 0) {

    var url = 'http://localhost:8000/bank.wsdl';
    var args = {
      USD: req.body.total,
      accountNumber: req.body.bank.AccountNumber,
      accountName: req.body.bank.AccountName,
      expirationDate: req.body.bank.ExpirationDate,
      securityNumber: req.body.bank.SecurityNumber,
      resellerName: 'Aalto Book Shop',
      resellerAuthCode: '7c5f16df18e3ad3e8946290b0eb193cc'
    };

    soap.createClient(url, function(err, client) {
      client.makePayment(args, function(err, result) {
        res.json(result);
      });
    });

  } else if(req.body.bank.Type == 1) {
    //TODO
    res.json({ paymentCompleted: true, error: 'no'});
  }


};
