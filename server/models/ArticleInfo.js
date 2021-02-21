const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: Array},
    pic: {type: String},
    title: {type: String},
    date: {type: String},
    content: {type: String},
})

module.exports = mongoose.model('ArticleInfo', schema)