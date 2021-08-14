const { language } = require('../config.json');
const profileSchema = require('./schemas/profile-schema');
const mongo = require('../mongo');

async function getXp(userID) {
    return await profileSchema.findOne({ _id: userID })
        .then(user => {
            return user.xp
        })
        .catch(err => {
            console.log(err)
        })
};

async function getLvL(userID) {
    return await profileSchema.findOne({ _id: userID })
        .then(user => {
            return user.level
        })
        .catch(err => {
            console.log(err)
        })
};

function nextLvL(userID) {
    return getLvL(userID)
        .then(level => {
            return level <= 1 ? 300 * (level + 1) : (300 * Math.round(-2 + 4 * level))
        })
        .catch(err => {
            console.log(err)
        })
};

async function lastLvL(userID) {
    return -(await nextLvL(userID));
};

module.exports.pfManager = {
    getxp: getXp,
    getlvl: getLvL,
    nextlvl: nextLvL,
    lastlvl: lastLvL
}

function logger(log, cl) {

    let langToUse;
    
    let eng_ps = ["en", "eng", "english", "ingles"];
    let pt_ps = ["pt", "pt-pt", "portuguese", "portugues"];
    let br_ps = ["br", "pt-br", "brazilian", "brazileiro"];
    let jp_ps = ["jp", "japanese", "japones"];
    let langs = language.toLowerCase()
    if (eng_ps.includes(langs)) {
        langToUse = "EN"
    } else if (pt_ps.includes(langs)) {
        langToUse = "PT"
    } else if (br_ps.includes(langs)) {
        langToUse = "BR"
    } else if (jp_ps.includes(langs)) {
        langToUse = "JP"
    }

    const langPath = require(`./langs/${langToUse}`);

    return langPath(log, cl)
}

function reason(reason) {
    return (!reason ? "Unknown" : reason)
};

function sleeptime(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports.manager = {
    logger,
    reason,
    sleep: sleeptime,
}