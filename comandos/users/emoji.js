const Discord = require('discord.js');

module.exports = {
    name: 'emoji',
    description: 'Obtem a imagem do emoji',
    execute(message, args, client) {
        message.delete({timeout: 30});
        if (!args[0]) return message.channel.send('Você não não especificou que emoji quer')
        const regexa = args[0].replace(/^<(a?):\w+:\d+>$/, '$1');
        const regex = args[0].replace(/^<a?:\w+:(\d+)>$/, '$1');
        let eurl = `https://cdn.discordapp.com/emojis/${regex}.png`;
        if (regexa) {
            eurl = `https://cdn.discordapp.com/emojis/${regex}.gif`
        }
        
        if (!regex) return message.reply(`${args[0]} não é um emoji válido`)

        let emojiembed = new Discord.MessageEmbed()
            .setColor("#FF00EF")
            .setImage(eurl)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp();
        message.channel.send(emojiembed)
    }
}