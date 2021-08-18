const { language } = require('../config.json');
const profileSchema = require('./schemas/profile-schema');

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
            return 150 * level * level + 450 * level + 300
        })
        .catch(err => {
            console.log(err)
        })
};

module.exports.pfManager = {
    getxp: getXp,
    getlvl: getLvL,
    nextlvl: nextLvL,
}

function logger(log, client, args, guild, userid, level, message) {

    let langToUse;
    
    const eng_ps = ["en", "eng", "english", "ingles"];
    const pt_ps = ["pt", "pt-pt", "portuguese", "portugues"];
    const br_ps = ["br", "pt-br", "brazilian", "brazileiro"];
    const jp_ps = ["jp", "japanese", "japones"];
    const langs = language.toLowerCase()
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

    return langPath(log, client, args, guild, userid, level, message)
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