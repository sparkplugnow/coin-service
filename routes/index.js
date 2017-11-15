const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Transaction =  require('../models/Transaction.js');
const Wallet = require('../models/Transaction.js');
const creds = require('../creds');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Coin Service' });
});

router.get('/', function (req, res, next) {
  User
    .find({}, function (err, users) {
      if (err) 
        throw err;
      Wallet
        .find({})
        .sort('-balance')
        .exec(function (err, wallets) {
          if (err) 
            throw err;
          res.render('index', {
            users: users,
            wallets: wallets
          })
        })
    })
  })


module.exports = router;
