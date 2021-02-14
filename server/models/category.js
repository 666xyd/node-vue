const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    classify: {type: String},
    describe: {type: String},
    comment: {type: String},
    time: {type: String},
})

module.exports = mongoose.model('Category', schema)