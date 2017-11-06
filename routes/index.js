const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Transaction =  require('../models/Transaction.js');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
//const creds = require('../creds');

router
  .get('/', function (req, res, next) {
    User
      .find({}, function (err, users) {
        if (err) 
          throw err;
        //  console.log('users', users)
        Wallet
          .find({}, function (err, wallets) {
            if (err) 
              throw err;
            //    console.log('wallet', wallets)
            res.render('index', {
              users: users,
              wallets: wallets
            })
          });
      });
  })


router.get('/transactions',function(req,res,next){
Transaction
  .getAllUsers(function (err, transactions) {
    if (err)throw err;
  res.render('transaction',{
    transactions:transactions
    })
  })
})
module.exports = router;