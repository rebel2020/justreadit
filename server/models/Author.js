const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name:String,
    age:String,
    city:String,
    email:String
})

module.exports = mongoose.model('Author',AuthorSchema);