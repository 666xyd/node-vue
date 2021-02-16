const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    pic: {type: String},
    name: {type: String},
    skin: {type: String},
    way: {type: Array},
    chip: {type: Number},
    coupon: {type: Number},
    date: {type: String},
    limit: {type: String,},
    classify: {type: Array},
})

module.exports = mongoose.model('SkinInfo', schema)