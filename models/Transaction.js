var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({


// on every save, add the date
transactionSchema.pre('save', function (next) {
      from: String,
      to: String,
      amount: Number,
      state: String,
      comment: String,
      created_at: Date,
      updated_at: Date,    
  });
  
  // on every save, add the date
  transactionSchema.pre('save', function(next) {
    const currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    if (!this.created_at) 
        this.created_at = currentDate;
    
    next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;