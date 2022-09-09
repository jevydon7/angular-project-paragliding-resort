const mongoose = require ('mongoose');

const Schema = mongoose.Schema;
 let events = new Schema({
    eventsName:{type:String}}, 
    {collection:'events'})

 module.exports = mongoose.model('events',events)