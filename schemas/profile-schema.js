const mongoose = require('mongoose')

const reqString = {
    type: String,
    require: true,
}

const Numb = {
    type: Number,
    default: 0
}

const profileSchema = mongoose.Schema({
    _id: reqString,
    name: reqString,
    coins: Numb,
    xp: Numb,
    level: Numb
})

module.exports = mongoose.model('XP', profileSchema)