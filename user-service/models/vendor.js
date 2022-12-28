var mongoose = require('mongoose');
var Address = require('./address')

var userSchema = new mongoose.Schema({
    emailId: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    mobileNumber:String,
    password:{
        type:String,
        select:false
    },
    name:String,
    image:{
        type:String,
        default:null
    },
    address:{
        type:Address,
        default:null
    }
});

module.exports = mongoose.model('vendor', userSchema);