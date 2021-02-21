const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    pic: {type: String},
    title: {type: String},
    date: {type: String},
    content: {type: String},
})

module.exports = mongoose.model('StrategyInfo', schema)