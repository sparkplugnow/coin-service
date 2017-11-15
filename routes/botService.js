const Botkit = require('botkit');
const os = require('os');
const komponist = require('komponist');
const request = require('request');
const sys = require('sys')
const exec = require('child_process').exec;
const token = require('./token.js');


const playlistStore = []
console.log('test')

// Connect to slack
const controller = Botkit.slackbot({
    debug: true,
});

const bot = controller.spawn({
     token: token.sparkplug
}).startRTM(function(err, bot, payload){
	if(err) {
		console.log(err);
		throw new Error('Could not connect to slack');
	}
});


    const client = komponist.createConnection(6600, 'localhost', function() {
        console.log('client created')
    });




controller.hears(':zap:', ['direct_message','direct_mention','mention'],function(bot,message) {

  bot.startConversation(message, function(err, convo){

      convo.addQuestion('Hey', function(response, convo){
        convo.say('you said ' + response.text)

      })
  })
  
 });



controller.hears('hello',['direct_message','direct_mention','mention'],function(bot,message) {


       // start a conversation to handle this response.
  bot.startConversation(message,function(err,convo) {

    convo.addQuestion('What is your name', function(response,convo) {

      convo.say('Cool, you said: ' + response.text);
      convo.say(knowledgebaseObject.welcomeMessage(response.text));
      convo.say(knowledgebaseObject.menuObject)

      convo.next();

    },{},'default');

    // convo.say(knowledgebaseObject.welcomeMessage);
    // convo.say(knowledgebaseObject.welcomeMessage);


  })
    //   client.currentsong(function(err, info) {
    //         console.log(info.Artist); 
    //         console.log(info.Title);  
    //         console.log(info.Album);  
    //         const nowPlaying = info.file
    //         nowPlaying = nowPlaying.replace(/.mp3/g, '');
    //         const reply_with_attachments = {
 
    // 'attachments': [
    //   {
    //     'fallback': 'Now Playing attachments',
    //     'title': 'Now Playing' + '\n' + 'Stream link - http://158.85.113.45:7500',
        
    //       "fields": [
    //             {
    //                 "title": nowPlaying,
                
    //                 "short": false
    //             }
    //         ],
        
    //     'color': '#7CD197'
    //   }
    // ],
    // 'icon_url': 'http://southpawgroup.com/gidiloungeart/images/albums_thumbnail/Untitled.jpg'
    // }
          // });

// MPD playlist
 //        client.playlist(function(err, info) {
 //          console.log(info)
 //        })

});


// //search request
// controller.hears('search',['direct_message', 'direct_mention', 'mention'], function(bot, message) {

// const str = message.text;

// //remove search keyword
// const newStr = str.replace(/search/i, '');

// //remove whitespace
// newStr = newStr.replace(/ /i,'');
// console.log(newStr);

// const bashCommand = './runyoutube.sh ' + '\'' + newStr + '\'';

// dir = exec(bashCommand, function(err, stdout, stderr) {
//   if (err) {
//     // should have err.code here?  
//   }
//   //bot.reply(message, stdout )
//   console.log(stdout);
// });

// dir.on('exit', function (code) {
//   // exit code is code
//   bot.reply(message, 'Song Added to Queue' )
// });


// //bot.reply(message, newStr )

  
//   const sendSearch = function(searchterm){

//             const options = {

//               url: 'http://gplayer.herokuapp.com/api/search?q='+searchterm,
//               headers: {
//                   'Accept': 'application/json',
//                   'Content-Type': 'application/json',                  
//             }
//           }
//             console.log('making network request')  
//  }
// })