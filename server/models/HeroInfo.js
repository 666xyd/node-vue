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
    skillList: {type: Array},
    describe: {type: String},
    score: {type: Number},
    heroSkill: {type: Array},
    bestPartner: {type: Array},
    bestPartnerDescribe: {type: Array},
    restrainBy: {type: Array},
    restrainByDescribe: {type: Array},
    restrainTo: {type: Array},
    restrainToDescribe: {type: Array},
    useSkill: {type: String},
    fightSkill: {type: String},
    fightThink: {type: String},
    mainAdd: {type: String},
    secondAdd: {type: String},
    onePic: {type: String},
})

module.exports = mongoose.model('HeroInfo', schema)