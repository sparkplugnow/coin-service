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
      .find({},function(err,wallets){
        if (err)throw err;
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

router.get('/:username', function (req, res, next) {
  User
    .find({}, function (err, users) {
      if (err) 
        throw err
      User
        .findOne({
          username: req.params.username
        }, function (err, user) {
          if (err) 
            throw err;
          Wallet
            .find({
              owner: req.params.id
            }, function (err, wallet) {
              if (err) 
                throw err;
              res.render('user', {
                users: users,
                user :user,
                wallet: wallet
              });
            })
        })
    })
})
//get user by username
router.put('/:username', function (req, res, next) {

  // get a user by username and update based on req.params.username
  User
    .findOneAndUpdate({
      username: req.params.username
    }, {
      username: req.body.username
    }, function (err, user) {
      if (err) 
        throw err;
      console.log(user)
      res.send(user)
    });
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
module.exports = router;

router.get('/transactions', function (req, res, next) {
  Transaction
    .getAllUsers(function (err, transactions) {
      if (err) 
        throw err;
      res.render('transaction', {transactions: transactions})
    })
})

module.exports = router;