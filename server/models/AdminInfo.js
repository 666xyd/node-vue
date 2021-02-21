const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {type: String},
    password: {
        type: String,
        select: false,
        set(val){
            return require('bcrypt').hashSync(val, 10)
        }
    },
    phone: {type: String},
    date: {type: String},
})

module.exports = mongoose.model('AdminInfo', schema)