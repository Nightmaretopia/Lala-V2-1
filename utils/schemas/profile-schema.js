const mongoose = require('mongoose');

const reqString = {
    type: String,
    require: true,
};

const numb = {
    type: Number,
    default: 0
};

const profileSchema = mongoose.Schema({
    _id: reqString, // future fuild id
    // _v: reqString, // future user id
    name: reqString,
    xp: numb,
    level: numb,
    reputation: numb,
    warns: numb,
    gifts: numb
},
{
    versionKey: false
});

module.exports = mongoose.model('Profile', profileSchema);