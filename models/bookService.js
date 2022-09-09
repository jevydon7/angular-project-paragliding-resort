const mongoose = require ('mongoose');

const Schema = mongoose.Schema;
 let booking = new Schema({
    firstName:{type:String}, 
    lastName:{type:String},
    phoneNumber:{type:String},
    email:{type:String},
    eventSelected:{type:String}
})

 module.exports = mongoose.model('booking', booking)
