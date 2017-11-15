var express = require('express');
var router = express.Router();
const Transaction = require('../models/Transaction.js');
const User = require('../models/User')
const Wallet = require('../models/Wallet')

router.get('/', function (req, res, next) {

  Transaction
    .find({}, function (err, transactions) {
      if (err) 
        throw err;
      
      res.send(transactions);
    });

});

router.post('/', function (req, res, next) {
  const {from, to, amount} = req.body;

  const options = {
    new: true
  };
  Wallet.findOneAndUpdate({
    "_id": from
  }, {
    $inc: {
      balance: -amount
    }
  }, options, function (err, walletFrom) {
    if (err) {
      res.send(err);
    }
    console.log(walletFrom);

    Wallet.findOneAndUpdate({
      "_id": to
    }, {
      $inc: {
        balance: amount
      }
    }, options, function (err, walletTo) {
      if (err) {
        res.send(err);
      }

      console.log(walletTo);

      res.send({walletFrom: walletFrom.balance, walletTo: walletTo.balance})
    });

  });

});

//get wallet by username
router.get('/:username', function (req, res, next) {

  Wallet
    .find({
      username: req.params.username
    }, function (err, username) {
      if (err) 
        throw err;
      res.send(username);
    });


});

module.exports = router;
