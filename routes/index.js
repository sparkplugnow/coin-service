const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
//const creds = require('../creds');

router.get('/', (req, res, next)=> {
  User
    .find({},(err, users)=>{
      if (err) 
        throw err;
      Wallet
        .find({})
        .sort('-balance')
        .exec(function (err, wallets) {
        .find({}, (err, wallets)=> {
          if (err) 
            throw err;
          res.render('index', {
            users: users,
            wallets: wallets
          })
        })
    })
})  
  

router.post('/', (req, res, next) => {
  const {firstname, lastname, username} = req.body;

  const newUser = new User({firstname, lastname, username, admin: false});

  newUser.save((err, user) => {
    if (err) {
      throw err;
    }

    const newWallet = new Wallet({owner: user.username, account_number: guid(), balance: 0});
    // save the wallet
    newWallet.save( (err, wallet)=> {
      if (err) {
        throw err
      }
      res.send({walletOwner: wallet.owner, account_number: wallet.account_number, username: user.username, walletBalance: wallet.balance})
      console.log(user, wallet)
    })
  })
});

router.get('/:username', (req, res, next) => {
  User
    .find({},(err, users)=> {
      if (err) 
        throw err
      User
        .findOne({
          username: req.params.username
        }, (err, user)=> {
          if (err) 
            throw err;
          Wallet
            .find({
              owner: req.params.id
            },  (err, wallet)=> {
              if (err) 
                throw err;
              res.render('user', {
                users: users,
                user: user,
                wallet: wallet
              });
            })
        })
    })
})
//get user by username
router.put('/:username', (req, res, next) => {

  // get a user by username and update based on req.params.username
  User
    .findOneAndUpdate({
      username: req.params.username
    }, {
      username: req.body.username
    }, (err, user)=> {
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
};

module.exports = router;