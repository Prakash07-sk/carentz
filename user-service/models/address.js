
 var Address = {
    houseNumber: String,
    line1:String,
    city:String,
    state:String,
    pincode:{
        type:Number,
        validate : {
            validator : Number.isInteger,
            message   : 'VALUE is not an integer value'
          }
    },
    country:String
}

module.exports = Address;