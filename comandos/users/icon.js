const Discord = require('discord.js');

module.exports = {
    name: 'icon',
    description: 'Envia a imagen do servidor',
    execute({message}) {
        message.delete({timeout: 30})
        let iconEmb = new Discord.MessageEmbed()
            .setColor('#00c5ff')
            .setImage(message.guild.iconURL({size: 2048, dynamic: true}))
        message.channel.send(iconEmb)
    }
}