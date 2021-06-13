const xp = require('./xp.json')

function getXp(userID) {
    return xp[userID].xp;
};

function getLvL(userID) {
    return xp[userID].level;
};

function nextLvL(userID) {
    return 600 * Math.round(-2 + 4 * getLvL(userID));
}

function lastLvL(userID) {
    return -(nextLvL(userID));
}

module.exports.getXp = getXp
module.exports.getLvL = getLvL
module.exports.nextLvL = nextLvL
module.exports.lastLvL = lastLvL