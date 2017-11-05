const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const walletSchema = new Schema({
      owner: String,
      account_number: String,
      balance: Number,
      created_at: Date,
      updated_at: Date,    
  });
  
  // on every save, add the date
  walletSchema.pre('save', function(next) {
    const currentDate = new Date();
  
    // change the updated_at field to current date
    this.updated_at = currentDate;
    if (!this.created_at)
      this.created_at = currentDate;
  
    next();
  });
  
  const Wallet = mongoose.model('Wallet', walletSchema);  

  module.exports = Wallet;