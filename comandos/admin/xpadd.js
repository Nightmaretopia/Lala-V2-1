const Discord = require('discord.js');
const { getXp, getLvL } = require('../../manager');

module.exports = {
    name: 'xpadd',
    description: 'Adiciona xp a um utilizador',
    execute(message, args, target) {
        // maybe
        if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("Você não tem permissão para usar este comando");
        if (!args) return;
        let amount = parseFloat(args.slice(1).join().replace(/,/g, ""));
        if (!amount) return message.channel.send("Você não especificou quanto xp quer dar");
        getXp(target.id) = getXP(target.id) + amount
        
        message.channel.send('Desu~')
    }
}