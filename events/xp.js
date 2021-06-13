const Discord = require('discord.js');
const xpManager = require('../manager');
const fs = require('fs');
const xp = require('../xp.json');

module.exports = {
    name: 'message',
    async execute(message) {

        if (message.author.bot) return;
        if (!message.guild.member(message.author).roles.cache.has('850113696155566161')) return;

        let addxp = Math.floor(Math.random() * (30 - 15)) + 15

        if(!xp[message.author.id]){
            xp[message.author.id] = {
                name: message.author.username,
                xp: addxp - addxp,
                level: 0
            }
        }

        let curxp = xp[message.author.id].xp
        let curlvl = xp[message.author.id].level
        let nextlvl = 600 * Math.round(-2 + 4 * curlvl)
        let lastlvl = -(nextlvl)
        if (curlvl == 0){
            nextlvl = 300
            lastlvl = -(nextlvl)
        }else{
            nextlvl = 300 * Math.round(-2 + 4 * curlvl)
            lastlvl = -(nextlvl)
        }

        xp[message.author.id].xp = curxp + addxp

        if(nextlvl <= xp[message.author.id].xp){
            xp[message.author.id].level = curlvl + 1
            let lvlupemb = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> alcançou o nivel **${curlvl + 1}**`)
            message.channel.send(lvlupemb)
                .catch(err => {
                    console.log(err)
                })
        }

        fs.writeFile("./xp.json", JSON.stringify(xp, null, 4), (err) => {
            if(err) console.log(err)
        })
    }
}