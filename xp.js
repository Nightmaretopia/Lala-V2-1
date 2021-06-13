const Discord = require('discord.js');
const xpManager = require('./manager');
const fs = require('fs');
const xp = require('./xp2.json');

module.exports = {
    execute(message, client) {

        let addxp = Math.floor(Math.random() * (30 - 15)) + 15;
        let user = message.author.id;
        let curxp = xpManager.getXp(user);
        let curlvl =  xpManager.getLvL(user);
        let nextlvl = xpManager.nextLvL(user);
        let lastlvl = xpManager.lastLvL(user);

        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                name: message.author.name,
                xp: addxp - addxp,
                level: 0
            }
        }

        if (curlvl == 0) {
            nextlvl = 300;
            lastlvl = -(nextlvl);
        } else {
            nextlvl = 600 * Math.round(-2 + 4 * curlvl);
            lastlvl = -(nextlvl)
        }

        curxp = curxp + addxp;

        if (nextlvl <= curxp) {
            curlvl = curlvl + 1
            let lvlupemb = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> alcançou o nivel **${curlvl + 1}**`)
            client.channels.cache.get('850114232011194398').send(lvlupemb)
        }

        fs.writeFile("./xp2.json", JSON.stringify(xp, null, 4), err => {
            console.log(err)
        })
    }
}