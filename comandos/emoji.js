const Discord = require('discord.js');

module.exports = {
    name: 'emoji',
    description: 'Obtem o .png do emoji',
    execute(message, args) {
        message.delete({timeout: 30});
        if (!args[0]) return message.channel.send('?');

        const regex = args[0].replace(/^<a?:\w+:(\d+)>$/, '$1');
        const emojim = message.guild.emojis.cache.find((emj) => emj.name === args[0] || emj.id === regex);
        
        if (!emojim) return message.channel.send(`${args[0]} não é um emoji válido`);
        let emojiembed = new Discord.MessageEmbed()
            .setColor("#FF00EF")
            .setImage(emojim.url)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp();
        message.channel.send(message.author, emojiembed);
    }
}