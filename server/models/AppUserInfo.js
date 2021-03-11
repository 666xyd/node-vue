const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String},   //用户名
    pic: {type: String},    //头像
    phone: {type: Number},  //手机号码
    like: {type: Array},   //收藏的文章like
    agree: {type: Array},    //点赞的文章agree
})

module.exports = mongoose.model('AppUserInfo', schema)