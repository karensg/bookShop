'use strict';

var _ = require('lodash');
var soap = require('soap');
var crypto = require("crypto");

var amazonKey = "AKIAJOC7FJJPG3A45KHQ";
var amazonSecret = "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";
var associateTag = "aaltunivwebte-20";
var url = 'https://webservices.amazon.com/AWSECommerceService/AWSECommerceService.wsdl';
var options = {};

exports.search = function(req, res) {

  var keywords = req.params.keywords;

  var action = "ItemSearch";
  var timeStamp = new Date().toISOString();
  var signatureString = action + timeStamp;
  var rfc2104Hmac = generateHmac(signatureString, amazonSecret);
  var args = {
    AWSAccessKeyId: amazonKey,
    Signature: rfc2104Hmac,
    Timestamp: timeStamp,
    AssociateTag: associateTag,
    Request: {
      SearchIndex: "Books",
      Keywords: keywords,
      Sort: "salesrank",
      ItemPage: 10,
      ResponseGroup: "ItemAttributes"
    }
  };

  soap.createClient(url, options, function(err, client) {
      client.ItemSearch(args, function(err, result) {
          res.json(result.Items.Item);
      });
  });

};

exports.book = function(req, res) {
  var bookId = req.params.id;

  var action = "ItemLookup";
  var timeStamp = new Date().toISOString();
  var signatureString = action + timeStamp;
  var rfc2104Hmac = generateHmac(signatureString, amazonSecret);
  var args = {
    AWSAccessKeyId: amazonKey,
    Signature: rfc2104Hmac,
    Timestamp: timeStamp,
    AssociateTag: associateTag,
    Request: {
      ItemId: bookId
    }
  };

  soap.createClient(url, options, function(err, client) {
    client.ItemLookup(args, function(err, result) {
      res.json(result);
    });
  });

}

function generateHmac (data, awsSecretKey, algorithm, encoding) {
  encoding = encoding || "base64";
  algorithm = algorithm || "sha256";
  return crypto.createHmac(algorithm, awsSecretKey).update(data).digest(encoding);
}
