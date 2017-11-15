const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Transaction = require('../models/Transaction.js');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
//const creds = require('../creds');


router.get('/', function (req, res, next) {
  User
    .find({}, function (err, users) {
      if (err) 
        throw err;
      Wallet
        .find({},function (err, wallets) {
          if (err) 
            throw err;
          res.render('index', {
            users: users,
            wallets: wallets
          })
        })
    })
})

router.post('/', function (req, res, next) {
  const {firstname, lastname, username} = req.body;

  const newUser = new User({firstname, lastname, username, admin: false});

  newUser.save((err, user) => {
    if (err) {
      throw err;
    }

    const newWallet = new Wallet({owner: user.username, account_number: guid(), balance: 0});
    // save the wallet
    newWallet.save(function (err, wallet) {
      if (err) {
        throw err
      }
      res.send({walletOwner: wallet.owner, account_number: wallet.account_number, username: user.username, walletBalance: wallet.balance})
      console.log(user, wallet)
    })
  })
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
