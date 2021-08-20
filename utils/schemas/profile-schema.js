const mongoose = require('mongoose');

const reqString = {
    type: String,
    require: true,
};

const num = {
    type: Number,
    default: 0
};

const bool = {
    type: Boolean,
    default: false
}

const profileSchema = mongoose.Schema({
    _id: reqString, // will be removed
    // guildID // pretty self explanatory
    // userID: // pretty self explanatory
    name: reqString,
    xp: num,
    level: num,
    ignoreRoles: Array,
    roles: Array,
    warns: num,
    isMuted: bool,
    mutedTime: num,
    marriedTo: String
},
{
    versionKey: false
    //_id: false
});

module.exports = mongoose.model('Profile', profileSchema);