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
    _id: reqString, // future guild id
    // userID: // pretty self explanatory
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