var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Wallet = require('../models/Wallet')
const Transaction = require('../models/Transaction')

router.get('/', function (req, res, next) {
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

router.post('/', function (req, res, next) {
  const {firstname, lastname, username} = req.body;

  const newUser =new  User({firstname, lastname, username, admin: false});

  newUser.save((err, user) => {
    if (err) {
      res.send(err)
    }

   // console.log(user.username);

    const newWallet =new Wallet({owner: user._id, account_number: guid(), balance: 0});
    // save the wallet
    newWallet.save(function (err, wallet) {
      if (err) {throw err}
      res.send({walletOwner: wallet.owner, account_number:wallet.account_number, username:user.username, walletBalance: wallet.balance})
console.log(user, wallet)
    })
  })
});

//get user by username
router.get('/:id', function (req, res, next) {
  User
    .find({
     _id: req.params.id
    }, function (err, user) {
      if (err)  throw err;
      Wallet
.find({
    owner: req.params.id
  }, function (err, wallet) {
          if (err) 
            throw err;
          res.render('user', {
            user: user,
            wallet:wallet
          })
        });
    })
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
