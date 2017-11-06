var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: { type: String, required: true, unique: true },
    admin: Boolean,
    location: String,
    age: Number,
    created_at: Date,
    updated_at: Date
  });
  
  // on every save, add the date
  userSchema.pre('save', function(next) {
    const currentDate = new Date();
  
    // change the updated_at field to current date
    this.updated_at = currentDate;
  
    if (!this.created_at)
      this.created_at = currentDate;
  
    next();
  });
  
  const User = mongoose.model('User', userSchema);  

  module.exports = User;

//custom functions for accessing the database
module.exports.getUserByUsername = function (username, callback) {
  var query = {
    username: username
  };
  User.findOne(query, callback);
}
module.exports.comparePassword = function (password, hash, callback) {
  bcrypt
    .compare(password, hash, function (err, isMatch) {
      if (err) 
        throw err;
      callback(null, isMatch);
    });
}
module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}
module.exports.getAllUsers = function (callback) {
  User.find({}, callback);
}