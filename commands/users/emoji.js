const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'emoji',
    description: 'Obtem a imagem do emoji',
    async execute({message, args}) {
        message.delete({timeout: 30});
        if (!args[0]) return message.channel.send('Você não não especificou que emoji quer')
        const animationCheck = args[0].replace(/^<(a?):\w+:\d+>$/, '$1');
        const emojiId = args[0].replace(/^<a?:\w+:(\d+)>$/, '$1');
        let eurl = `https://cdn.discordapp.com/emojis/${emojiId}.png`;
        if (animationCheck) {
            eurl = `https://cdn.discordapp.com/emojis/${emojiId}.gif`
        }
        let emojiembed = new MessageEmbed()
            .setColor("#FF00EF")
            .setImage(eurl)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp();
        
        const response = await fetch(eurl).catch(error => console.log('Erros: ' + error.message))
        if (response.ok) message.channel.send({ embeds: [emojiembed] })
        else message.channel.send(`\`${args[0]}\` nâo é um emoji válido`)
    }
}