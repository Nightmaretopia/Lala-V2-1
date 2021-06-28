const mongoose = require('mongoose');

const reqString = {
    type: String,
    require: true,
};

const numb = {
    type: Number,
    default: 0
};

const monthSchema = mongoose.Schema({
    __id: numb,
    month: reqString,
    usages: numb,
    percentage: numb
});

module.exports = mongoose.model('Months', monthSchema);