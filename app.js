const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const creds = require('./creds');
const Botkit = require('botkit');
const axios = require('axios');

const index = require('./routes/index');
const users = require('./routes/users');
const wallet = require('./routes/wallet');
const transaction = require('./routes/transaction');

const app = express();

const mongoDb = creds.creds.mongoDb
mongoose.connect(mongoDb, {
  useMongoClient: true
});   

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log('connection to database established')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/wallet', wallet);
app.use('/transaction', transaction);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req
    .app
    .get('env') === 'development'
    ? err
    : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
  
    const userList = [];
    const controller = Botkit.slackbot({
        debug: false,
    });
    const bot = controller.spawn({
         token: 'xoxb-268367665959-Obm72SEmiXEYjdFTxq1Gg7Xw'
    }).startRTM(function(err, bot, payload){
      bot.api.users.list({}, (error, response) => {
       error && console.log(error)
       response.members.map((item) => userList.push(item)); 
      });
    
      if(err) {
        console.log(err);
        throw new Error('Could not connect to slack');
      }
    });
  
  controller.hears('list-files', ['direct_message'], (bot, message) => { 
  
    //Make a request for a user with a given ID
  axios.get(`http://localhost:4001/users/all`)
    .then(function (response) {
     
      const reply_with_attachments = {
        'username': 'test',
        'text': 'test',
        'attachments': [{
          'title': 'test',
          'text': 'create',
          'color': '#7CD197'
        }],
        'icon_url': 'http://lorempixel.com/48/48'
      }
      
      bot.reply(message, reply_with_attachments);
    })
    .catch(function (error) {
      console.log(error);
    })
    })
  
  
  controller.hears('profile', ['direct_message'], (bot, message) => {
  
  const username = wordSplitter(message.text)[1];
  
    // Make a request for a user with a given ID
  axios.get(`http://localhost:4001/users/${username}`)
  .then(function (response) {
    console.log(response.data[0]);
  
    const reply_with_attachments = {
      'username': response.data[0].firstname,
      'text': response.data[0].lastname,
      'attachments': [
        {
          'fallback': 'To be useful, I need you to invite me in a channel.',
          'title': `${response.data[0].username}`,
          'text': `created on ${response.data[0].created_at}`,
          'color': '#7CD197'
        }
      ],
      'icon_url': 'http://lorempixel.com/48/48'
    }
    
    bot.reply(message, reply_with_attachments);
  })
  .catch(function (error) {
    console.log(error);
  });
      
  })
  
  
  controller.hears(['profile'],['mention','direct_message'], (bot,message) => {
    //Get give profile information
    //Get username from request and get profile info from Mongo
  });
  
  controller.hears(['registration'], ['direct-message'], (bot, message) => {
    bot.startConversation(message, initiateRegister);
  
  })
  
  initiateRegister = (response, convo) => {
      convo.say('Hello <@'+response.user+'>');
      convo.ask(`Hi <@'${response.user}'>', welcome to Sparkplug, feel free to say 'Help' anytime, `, (resp, convo) => {
      const reply_with_attachments = {
        'username': response.data[0].firstname,
        'text': response.data[0].lastname,
        'attachments': [
          {
            'fallback': 'To be useful, I need you to invite me in a channel.',
            'title': `You can say 'Transfer' to initiate`,
            'text': `You can also say 'Profile @username' to learn about people`,
            'color': '#7CD197'
          }
        ],
        'icon_url': 'http://lorempixel.com/48/48'
      }
      
      convo.reply(message, reply_with_attachments);
        convo.next();
      });
      
  }
  
  
  
  controller.hears(['transfer'],['direct_mention','direct_message'], (bot,message) => {
      bot.startConversation(message, askRecipient);
    });
    
    askRecipient = (response, convo) => {
      convo.ask("Who do you want to send coin to?", (response, convo) => {
        
        validateUser(response.text, userList) ? askPrice(response, convo, response.text) :  userNotFound(response, convo, response.text)
        convo.next();
      });
    }
  
    userNotFound = function(response, convo, recipient) {
      convo.say(`Sorry, ${recipient} does not exist, Goodbye`, (response, convo) => {
        convo.next();
      });
    }
  
  
    askPrice = function(response, convo, recipient) {
      convo.ask(`How many coins do you want to send to ${recipient}?`, (response, convo) => {
        isNumber(response.text) ?  confirmTransaction(response, convo, {recipient: recipient, amount: response.text}) : convo.say('Invalid amount, Goodbye');
        convo.next();
      });
    }
  
  confirmTransaction = (response, convo, meta) => { 
         convo.say(`Final confirmation, do you, <@${convo.source_message.user}> want to send ${meta.amount} coins to ${meta.recipient}?`)
         const transactionPayload = {
           sender: resolveUsername(convo.source_message.user),
           receiver: resolveUsername(meta.recipient.slice(2,11)),
           amount: meta.amount
         };
console.log(response, convo, meta)
        if(response.text == 'yes') {
          transferTransporter(transactionPayload, convo)
        }

         
         console.log(transactionPayload)
      }
  
  
      broadcastMessage = (response, convo) => { 
        // broadcast this message to group
        console.log(response);
      }
  
  
  
  //Utilities

const transferTransporter = (payload, convo) =>  {
  console.log('im in transporter');
      //Make a request for a user with a given ID
      axios.post(`/transaction`, payload)
      .then(function (response) {
      
        console.log(transaction);

        // const reply_with_attachments = {
        //   'username': 'test',
        //   'text': 'test',
        //   'attachments': [{
        //     'title': 'test',
        //     'text': 'create',
        //     'color': '#7CD197'
        //   }],
        //   'icon_url': 'http://lorempixel.com/48/48'
        // }
        
        // bot.reply(message, reply_with_attachments);
      })
}


  const userNameResolver = (bot, user) => {
    bot.api.users.info({user: user}, (error, response) => {
      let {name, real_name} = response.user;
      console.log(name);
      return name;
  })
  }
  
  const wordSplitter = (input) => {
      return input.split(" ")
  }
  
  const validateUser = (response, userList) => {
    
    const cleanResponse = response.substring(2,11);
    let found = false;
    userList.map((item) => {
      console.log(`Item is ${item.id} and cleanResponse is ${cleanResponse}`)
      item.id === cleanResponse ? found = true : void 0;
    })
    
    return found;
  }
  
  const isNumber = val => /^\d+$/.test(val);
  
  const resolveUsername = userId => {
    const cleanUserId = userId.substring(0,12);
    let username = '';
    userList.map((item) => {
      item.id === cleanUserId ? username = item.name : null;
    });
    return username;
  }

