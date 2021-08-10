const { language } = require('../config.json')
const xp = require('../xp.json');
const mongo = require('../mongo');

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

function getXp(userID) {
    return xp[userID].xp;
};

function getLvL(userID) {
    return xp[userID].level;
};

function nextLvL(userID) {
    if (getLvL(userID) == 0) {
        return 300;
    } else {
        return 300 * Math.round(-2 +4 * getLvL(userID))
    }
};

function lastLvL(userID) {
    return -(nextLvL(userID));
};

module.exports = {
    logger,
    reason,
    sleep: sleeptime,
    getxp: getXp,
    getlvl: getLvL,
    nextlvl: nextLvL,
    lastlvl: lastLvL,
}