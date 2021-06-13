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
    Name: reqString,
    XP: Numb,
    Level: Numb
})

module.exports = mongoose.model('XP', profileSchema)