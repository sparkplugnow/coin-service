var express = require('express');
var router = express.Router();
const User =  require('../models/User.js');


router.get('/', function(req, res, next) {
  
    User.find({}, function(err, users) {
      if (err) throw err;
  
      res.send(users);
    });
  
  });

router.post('/', function(req, res, next) {
  const { firstname, lastname, username  } = req.body;

    const newUser = User({
      firstname,
      lastname,
      username,
      admin: false
      });
      console.log(newUser)
       // save the user
       newUser.save(function(err) {
        if (err) {
          console.log(err)
          throw err;
        } 
  
        console.log('User created!');
        res.send('user created')
    
        return { completed: true}
        
        });

    
    });

//get user by username
router.get('/:username', function(req, res, next) {
  
   User.find({username: req.params.username}, function(err, users) {
     if (err) throw err;

     res.send(users);
   });

});

//get user by username
router.put('/:username', function(req, res, next) {

  // get a user by username and update based on req.params.username
  User.findOneAndUpdate({ username: req.params.username }, { username: req.body.username }, function(err, user) {
    if (err) throw err;
    console.log(user)
    res.send(user)
  });

  });


module.exports = router;
