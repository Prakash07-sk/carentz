var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
   emailId:String,
   otp:Number,
   createdAt: { type: Date, expires: '300000', default: Date.now }
},{timestamps: true});

module.exports = mongoose.model('otp', userSchema);