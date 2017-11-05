var express = require('express');
var router = express.Router();
const Transaction =  require('../models/Transaction.js');
const User = require('../models/User')
const Wallet = require('../models/Wallet')

router.get('/', function(req, res, next) {
  
    Transaction.find({}, function(err, transactions) {
      if (err) throw err;
  
      res.send(transactions);
    });
  
  });



router.post('/', function(req, res, next) {
  const { amount  } = req.body;
    // const newTransaction = Transaction({
    //   from,
    //   to,
    //   amount   
    //   });
    //    // save the wallet
    //    newTransaction.save(function(err) {
    //     if (err) {
    //       throw err;
    //     } 
    //     console.log('Transaction created!');
    //     res.send('Transaction created')
   // });

   var query = {"_id": '59fe6b8140dff26ff07365d0'};
   var update = {$inc : {balance : -amount}}
   var options = {new: true};
   Wallet.findOneAndUpdate(query, update, options, function(err, wallet) {
     if (err) {
       console.log('got an error');
     }
   
     res.send(wallet)
     // at this point person is null.
   });

  //  Transaction.findOneAndUpdate()



    });

//get wallet by username
router.get('/:username', function(req, res, next) {
  
   Wallet.find({username: req.params.username}, function(err, username) {
     if (err) throw err;

     res.send(username);
   });

});

module.exports = router;
