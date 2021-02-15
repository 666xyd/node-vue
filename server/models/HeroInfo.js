const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    pic: {type: Array},
    name: {type: String},
    way: {type: Array},
    money: {type: Number},
    chip: {type: Number},
    coupon: {type: Number},
    date: {type: String},
    classify: {type: Array},
    describe: {type: String},
})

module.exports = mongoose.model('HeroInfo', schema)