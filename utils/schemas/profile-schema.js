const mongoose = require('mongoose');

const reqString = {
    type: String,
    require: true,
};

const num = {
    type: Number,
    default: 0
};

const profileSchema = mongoose.Schema({
    _id: reqString, // future fuild id
    // _v: reqString, // future user id
    name: reqString,
    xp: num,
    level: num,
    reputation: num,
    warns: num,
    gifts: num
},
{
    versionKey: false
});

module.exports = mongoose.model('Profile', profileSchema);