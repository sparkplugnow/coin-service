var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Wallet = require('../models/Wallet')
const Transaction = require('../models/Transaction')

router.get('/', function (req, res, next) {
  User
    .find({}, function (err, users) {
      if (err)  throw err;
      //  console.log('users', users)
      Wallet
        .find({}, function (err, wallets) {
          if (err) throw err; 
          //    console.log('wallet', wallets)
          res.render('index', {
            users: users,
            wallets: wallets
          })
        });
    });
})

router.post('/', function (req, res, next) {
  const {firstname, lastname, username} = req.body;

  const newUser = User({firstname, lastname, username, admin: false});
  console.log(newUser)
  // save the user
  newUser.save(function (err) {
    if (err) {
      console.log(err)
      throw err;
    }
    const {account_number, balance} = req.body;
    const newWallet = Wallet({owner: req.body.balance, account_number, balance, admin: false});
    // save the wallet
    newWallet.save(function (err) {
      if (err) {
        console.log(err)
        throw err;
      }

      console.log('User created!');
      res.send('user created')

      return {completed: true}
      })
    });
  });
  //get user by username
  router.get('/:username', function (req, res, next) {

    User
      .find({
        username: req.params.username
      }, function (err, users) {
        if (err) 
          throw err;
        
        res.send(users);
      });

  });

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

  module.exports = router;
