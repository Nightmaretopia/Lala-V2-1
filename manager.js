const xp = require('./xp.json');
const mongo = require('./mongo');

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

function rainbowcall(num, text) {
    if (num == "0") {
        num = "38"
    } else if (num == "1") {
        num = "48"
    }
    const consoleColorify = (r, g, b) => str => `\u001B[${num};2;${r};${g};${b}m${str}\x1b[0m`
    function HSVtoRGB(hue, saturation, value) {

        const chroma = value * saturation;
        const scaledHue = hue * 6;
        const hueRegion = Math.floor(scaledHue);
        const X = chroma * (1 - Math.abs(scaledHue % 2 - 1));
        const m = value - chroma;

        switch (hueRegion) {
            case 0:
                return [chroma + m, X + m, m];
            case 1:
                return [X + m, chroma + m, m];
            case 2:
                return [m, chroma + m, X + m];
            case 3:
                return [m, X + m, chroma + m];
            case 4:
                return [X + m, m, chroma + m];
            case 5:
                return [chroma + m, m, X + m];
        }
    }

    function makeRainbow(s, speed=0.1) {
        let result = ""
        for (let h = 0; h < s.length; h++) {
            const color = HSVtoRGB((h * speed) % 1, 1, 1);
            result += consoleColorify(Math.floor(color[0] * 0xFF), Math.floor(color[1] * 0xFF), Math.floor(color[2] * 0xFF))(s[h]);
        }
        return result;
    }
    console.log(makeRainbow(text))
};

module.exports.reason = reason;
module.exports.sleep = sleeptime;
module.exports.getXp = getXp;
module.exports.getLvL = getLvL;
module.exports.nextLvL = nextLvL;
module.exports.lastLvL = lastLvL;
module.exports.rainbow = rainbowcall;