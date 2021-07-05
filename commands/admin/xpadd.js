const Discord = require('discord.js');
const fs = require('fs');
const { getXp, getLvL } = require('../../utils/manager');
const xp = require('../../xp.json');

module.exports = {
    name: 'xpadd',
    description: 'Adiciona xp a um utilizador',
    execute({message, args, target}) {
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("Você não tem permissão para usar este comando");
        if (!args) return;
        let amount = parseFloat(args.slice(1).join().replace(/,/g, ""));
        if (!amount) return message.channel.send("Você não especificou o utilizador");
        xp[target.id].xp = xp[target.id].xp + amount

        fs.writeFile("./xp.json", JSON.stringify(xp, null, 4), (err) => {
            if(err) console.log(err)
        })
    }
}