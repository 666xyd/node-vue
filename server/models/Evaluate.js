const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id: {type: String},
    name: {type: String},
    user: {type:Object},
    content: {type: String},
    date: {type: String},
})

module.exports = mongoose.model('Evaluate', schema)