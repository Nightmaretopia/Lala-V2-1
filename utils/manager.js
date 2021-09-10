const { language } = require('../config.json');
const { colors } = require('./color-manager');
const profileModel = require('./schemas/profile-schema');

class logger {
    constructor() {
        this.language = lang();
        this.languageFolder = require(`./langs/${this.language}`);
        this.color = colors.color("#fc036b");
        this.gradPrim = colors.color("#0048ff");
        this.gradLast = colors.color("#c603fc");
        this.emoji = "🌌";
        this.errorColor = colors.red;
        this.errorEmoji = "❌";
    }
    setColor(color) {
        return this.color = color
    }
    setEmoji(emoji) {
        return this.emoji = emoji
    }
    time() {
        return colors.text(colors.text(`[${new Date().toLocaleTimeString()}]`, colors.white, true), colors.black)
    };
    defaultPrint(log, mem = false) {
        if (mem) {
            console.log(`${colors.customGrad(memory(), this.gradPrim, this.gradLast, colors.rgb, colors.cubic)} ${this.time()} ${this.emoji} ${colors.customGrad(log, this.gradLast, this.gradPrim, colors.rgb, colors.cubic)} ${colors.reset}`)
        } else {
            console.log(`${this.time()} ${this.emoji} ${colors.text(log, this.color)}`)
        }

    };
    costumPrint(log) {
        return console.log(log)
    };
    error(log, mem = true) {
        if (mem) {
            console.error(`${colors.text(memory(), this.errorColor)} ${this.time()} ${this.errorEmoji} ${colors.text(log, this.errorColor)}`)
        } else {
            console.error(`${this.time()} ${this.errorEmoji} ${colors.text(log, this.errorColor)}`)
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
        logo: this.languageFolder({ event: "login" }),
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
        level: (user, level) => this.languageFolder({ event: "level_up", user: user, level: level })
    };
    commands = {
        kick: {
            description: this.languageFolder({ event: "kick" }),
            target: this.languageFolder({ event: "kick_target" }),
            mention: this.languageFolder({ event: "kick_mention" }),
            id: this.languageFolder({ event: "kick_id" }),
            reason: this.languageFolder({ event: "kick_reason" }),
        },
        ban: {
            description: this.languageFolder({ event: "ban" }),
            target: this.languageFolder({ event: "ban_target" }),
            mention: this.languageFolder({ event: "ban_mention" }),
            id: this.languageFolder({ event: "ban_id" }),
            reason: this.languageFolder({ event: "ban_reason" }),
        },
        unban: {
            description: this.languageFolder({ event: "unban" }),
            id: this.languageFolder({ event: "unban_id" }),
            reason: this.languageFolder({ event: "unban_reason" })
        },
        mute: {
            description: this.languageFolder({ event: "mute" }),
            target: this.languageFolder({ event: "mute_target" }),
            reason: this.languageFolder({ event: "mute_reason" })
        },
        tempmute: {
            description: this.languageFolder({ event: "tempmute" }),
            target: this.languageFolder({ event: "tempmute_target" }),
            reason: this.languageFolder({ event: "tempmute_reason" })
        },
        avatar: {
            description: this.languageFolder({ event: "avatar" }),
            targets: this.languageFolder({ event: "avatar_target" })
        },
        icon: this.languageFolder({ event: "icon" }),
        emoji: {
            description: this.languageFolder({ event: "emoji" }),
            action: this.languageFolder({ event: "emoji_emoji" }),
            id: this.languageFolder({ event: "emoji_id" }),
            id_ac: this.languageFolder({ event: "emoji_id_id" })
        },
    };
}

const logs = new logger()

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

async function getXp(guildID, userID) {
    return await profileModel.findOne({ guildID: guildID, userID: userID })
        .then(user => {
            return user.xp
        })
        .catch(err => {
            logs.error(err.stack)
        })
};

async function getLvL(guildID, userID) {
    return await profileModel.findOne({ guildID: guildID, userID: userID })
        .then(user => {
            return user.level
        })
        .catch(err => {
            logs.error(err.stack)
        })
};

function nextLvL(guildID, userID) {
    return getLvL(guildID, userID)
        .then(level => {
            return 150 * level * level + 450 * level + 300
        })
        .catch(err => {
            logs.error(err.stack)
        })
};

function reason(reason) {
    return (!reason ? "Unknown" : reason)
};

function sleeptime(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function hentaiLogic(type) {
    if (type === "blowJob") {
        const arr = ["bJ", "blowJob"]
        const a = Math.round(Math.random())
        type = arr[a]
        return type

    } else if (type === "neko") {
        const arr = ["nekoGif", "neko"]
        const a = Math.round(Math.random())
        type = arr[a]
        return type

    } else if (type === "feet") {
        const arr = ["feetGif", "feet"]
        const a = Math.round(Math.random())
        type = arr[a]
        return type

    } else if (type === "pussy") {
        const arr = ["pussy", "pussyWankGif", "pussyArt"]
        const a = Math.round(Math.random() * 2)
        type = arr[a]
        return type

    } else if (type === "girlSolo") {
        const arr = ["girlSolo", "girlSoloGif"]
        const a = Math.round(Math.random())
        type = arr[a]
        return type
    } else {
        return undefined
    }
}

module.exports = {
    logger: new logger(),
    bot: new BotLogger(),
    log: new log(),
    manager: {
        reason,
        sleep: sleeptime,
        hentaiLogic
    },
    pfManager: {
        getxp: getXp,
        getlvl: getLvL,
        nextlvl: nextLvL
    }
}