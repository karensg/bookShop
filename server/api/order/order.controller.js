'use strict';

var soap = require('soap');
var resellerName = 'Aalto Book Shop';
var resellerAuthCode = '7c5f16df18e3ad3e8946290b0eb193cc';


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
      resellerName: resellerName,
      resellerAuthCode: resellerAuthCode
    };

    soap.createClient(url, function(err, client) {
      client.makePayment(args, function(err, result) {
        res.json(result);
      });
    });

  }
  // Another bank
  else if(req.body.bank.Type == 1) {
    var url = 'http://demo.seco.tkk.fi/ws/5/';
    var args = {
      UserAccount: req.body.bank.AccountNumber,
      CompanyAccount: resellerName,
      Amount: req.body.total
    };
    var options = {
      endpoint: url
    };
    soap.createClient(url + '?wsdl', options , function(err, client) {
      client.getPayment(args, function(err, result) {
        res.json({ paymentCompleted: result.Success, message: result.Message});
      });
    });
  }


};








//sd
