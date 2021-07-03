const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'icon',
    description: 'Envia a imagen do servidor',
    async execute({message}) {
        message.delete({timeout: 30})
        let iconEmb = new MessageEmbed()
            .setColor('#00c5ff')
            .setImage(message.guild.iconURL({size: 2048, dynamic: true}))
        await message.channel.send({ embeds: [iconEmb] })
    }
}