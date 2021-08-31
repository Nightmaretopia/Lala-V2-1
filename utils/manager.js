const { language } = require('../config.json');
const { colors } = require('./color-manager');
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

function lang() {

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

    return langToUse
}

function memory() {
    const memory = process.memoryUsage();
    const used = memory.heapUsed / 1000 / 1000;
    const total = memory.heapTotal / 1000 / 1000;

    const usedPadded = used < 100 ? "0" + used.toFixed(2) : used.toFixed(2);
    const totalPadded = total < 100 ? "0" + total.toFixed(2) : total.toFixed(2);

    return `${usedPadded}/${totalPadded}MB`;
}

class logger {
    constructor() {
        this.language = lang()
        this.languageFolder = require(`./langs/${this.language}`)
        this.color = colors.pink
        this.emoji = "🌸"
        this.errorColor = colors.red
        this.errorEmoji = "❌"
    }
    time() {
        return colors.text(colors.text(`[${new Date().toLocaleTimeString()}]`, colors.white, true), colors.black)
    };
    defaultPrint(log, mem = false) {
        if (mem) {
            console.log(`${colors.text(memory(), this.color)} ${this.time()} ${this.emoji} ${colors.text(log, this.color)}`)
        } else {
            console.log(`${this.time()} ${this.emoji} ${colors.text(log, this.color)}`)
        }
        
    };
    costumPrint(log) {
        return log
    };
    error(log, mem = true) {
        if (mem) {
            console.log(`${colors.text(memory(), this.errorColor)} ${this.time()} ${this.errorEmoji} ${colors.text(log, this.errorColor)}`)
        } else {
            console.log(`${this.time()} ${this.errorEmoji} ${colors.text(log, this.errorColor)}`)
        }
    };
}

class BotLogger extends logger {
    commands = (file, location, isMem = false) => this.defaultPrint(`Loaded ${file} from ${location}`, isMem);
    events = (file, isMem = false) => this.defaultPrint(`Loaded ${file} event`, isMem);
}

class log extends logger {
    bot = {
        login: client => this.languageFolder({ event: "bot_start", client: client }),
        mongo: (client, state) => this.languageFolder({ event: `bot_mongo_state_${state}`, client: client }),
        test: this.languageFolder({ event: "login" }),
        restarting: this.languageFolder({ event: "restarting" }),
        restart: this.languageFolder({ event: "restarted" }),
        restarted: this.languageFolder({ event: "sucefully_restarted" })
    };
    errors = {
        exec: this.languageFolder({ event: "error_exec" }),
        missing: this.languageFolder({ event: "missing_permissions" }),
        invalid: args => this.languageFolder({ event: "not_valid", args: args }),
        invalid_emoji: emoji => this.languageFolder({ event: "emoji_not_valid", emoji: emoji })
    };
    messages = {
        level: level => this.languageFolder({event: "level_up", level: level})
    };
}

function reason(reason) {
    return (!reason ? "Unknown" : reason)
};

function sleeptime(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
    logger: new logger(),
    bot: new BotLogger(),
    log: new log(),
    manager: {
        reason,
        sleep: sleeptime
    },
    pfManager: {
        getxp: getXp,
        getlvl: getLvL,
        nextlvl: nextLvL
    }
}