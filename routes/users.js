var express = require('express');
var router = express.Router();
const User = require('../models/User.js');
const Wallet = require('../models/Wallet.js');

router.get('/', function (req, res, next) {

  User
    .find({}, function (err, users) {
      if (err) 
        res.send(err);
      
      res.send(users);
    });

});

router.post('/', function (req, res, next) {
  const {firstname, lastname, username} = req.body;

  const newUser = User({firstname, lastname, username, admin: false});

  newUser.save((err, saveResponse) => {
    if (err) {
      res.send(err)
    }

    console.log(saveResponse.username);

    const newWallet = Wallet({owner: saveResponse._id, account_number: guid(), balance: 0});

    // save the wallet
    newWallet.save(function (err, walletResponse) {
      if (err) {
        console.log(err)
        res.send(err);
      }
      res.send({walletOwner: walletResponse.owner, account_number: walletResponse.account_number, username: saveResponse.username, walletBalance: walletResponse.balance})
    })
  })
});

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

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
} 

module.exports = router;
