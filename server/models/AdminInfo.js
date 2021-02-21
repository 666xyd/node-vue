const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String},
    password: {type: String},
    phone: {type: String},
    date: {type: String},
})

module.exports = mongoose.model('AdminInfo', schema)