const Discord = require('discord.js');
const { nextLvL, getXp, getLvL } = require('../../manager');

module.exports = {
    name: 'rank',
    description: 'Mostra o Level e XP atual',
    execute({message}) {
        const user = message.mentions.users.first() || message.author;
        const difference = nextLvL(user.id) - getXp(user.id);
        let lvlembed = new Discord.MessageEmbed()
            .setAuthor(user.username)
            .setThumbnail(user.displayAvatarURL())
            .setColor('0000FF')
            .addFields(
                { name: 'Level', value: getLvL(user.id), inline: true },
                { name: 'XP', value: getXp(user.id), inline: true }
            )
            .setFooter(`${difference} XP para subir de nivel`, message.author.displayAvatarURL());
        message.channel.send(message.author, lvlembed)
    }
}