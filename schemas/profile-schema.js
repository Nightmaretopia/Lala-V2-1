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
    _id: reqString,
    name: reqString,
    coins: numb,
    xp: numb,
    level: numb,
    reputation: numb,
    gifts: numb
});

module.exports = mongoose.model('XP', profileSchema);