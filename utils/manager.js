const xp = require('../xp.json');
const mongo = require('../mongo');

function reason(reason) {
    if (!reason) {
        return "Unknown"
    } else {
        return reason
    }
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

module.exports.reason = reason;
module.exports.sleep = sleeptime;
module.exports.getXp = getXp;
module.exports.getLvL = getLvL;
module.exports.nextLvL = nextLvL;
module.exports.lastLvL = lastLvL;