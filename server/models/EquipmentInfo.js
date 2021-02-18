const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    pic: {type: String},
    name: {type: String},
    classify: {type: String},
    money: {type: Number},
    effect: {type: Object},
    describe: {type: String},
})

module.exports = mongoose.model('EquipmentInfo', schema)