const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: String,
    aId: String,
    tags:[String],
    content:String,
    image:String
});

module.exports = mongoose.model('Blog',BlogSchema);