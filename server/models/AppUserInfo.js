const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String},   //用户名
    pic: {type: String},    //头像
    phone: {type: Number},  //手机号码
    collect: {type: Array},   //收藏的文章
    praise: {type: Array},    //点赞的文章


})

module.exports = mongoose.model('AppUserInfo', schema)