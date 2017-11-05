var express = require('express');
var router = express.Router();
const Wallet =  require('../models/Wallet.js');


router.get('/', function(req, res, next) {
  
    Wallet.find({}, function(err, users) {
      if (err) throw err;
  
      res.send(users);
    });
  
  });



router.post('/', function(req, res, next) {
  const { owner, account_number, balance  } = req.body;


    const newWallet = Wallet({
      owner,
      account_number,
      balance   
      });
       // save the wallet
       newWallet.save(function(err) {
        if (err) {
          console.log(err)
          throw err;
        } 
  
        console.log('Wallet created!');
        res.send('wallet created')
        });
    });

//get wallet by username
router.get('/:username', function(req, res, next) {
  
   Wallet.find({username: req.params.username}, function(err, username) {
     if (err) throw err;

     res.send(username);
   });

});

module.exports = router;
