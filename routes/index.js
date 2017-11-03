const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Transaction =  require('../models/Transaction.js');
const Wallet = require('../models/Transaction.js');
//const creds = require('../creds');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Coin Service' });
});

module.exports = router;
