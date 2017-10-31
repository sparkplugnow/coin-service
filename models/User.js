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