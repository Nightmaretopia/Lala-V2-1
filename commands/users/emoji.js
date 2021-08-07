const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emoji',
    description: 'Obtem a imagem do emoji',
    async execute({message, args}) {
        message.delete({timeout: 30});
        if (!args[0]) return message.channel.send('Você não não especificou que emoji quer');
        const emojiId = args[0].replace(/^<a?:\w+:(\d+)>$/, '$1');

        let eurl = `https://cdn.discordapp.com/emojis/${emojiId}`;
        let emojiembed = new MessageEmbed()
        .setColor("#FF00EF")
        .setImage(eurl)
        .setFooter(message.author.username, message.author.displayAvatarURL())
        .setTimestamp();

        message.channel.send({ embeds: [emojiembed] });
    }
}