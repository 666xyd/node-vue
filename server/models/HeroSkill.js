const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    pic: {type: String},
    name: {type: String},
    icon: {type: String},
    level: {type: String},
    describe: {type: String},
})

module.exports = mongoose.model('HeroSkill', schema)