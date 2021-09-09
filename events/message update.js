const { MessageEmbed } = require('discord.js');
const guildModel = require("../utils/schemas/guild-schema")

module.exports = {
    event: 'messageUpdate',
    name: 'Message Updates',
    async execute(oldMsg, newMsg, client) {
        if (oldMsg.partial) return;
        if (!oldMsg.guild) return;
        if (!oldMsg.content) return;
        if (oldMsg.author.bot) return;
        if (newMsg.content === oldMsg.content) return;

        const guild = await guildModel.findOne(
            {
                _id: newMsg.guild.id
            },
            {
                logChannels: true
            }
        )
        if (!guild) return;
        const { logChannels } = guild

        let pfimage = newMsg.author.displayAvatarURL()
        let editembed = new MessageEmbed()
            .setColor("#fcba03")
            .setAuthor(newMsg.author.tag, pfimage)
            .setDescription(`**Mensagem editada em ${newMsg.channel}**`)
            .addField('**Mensagem Antiga**', oldMsg.content)
            .addField('**Mensagem Nova**', newMsg.content)
            .setFooter(`${oldMsg.author.username} ID: ${oldMsg.author.id} | ID da Mensagem: ${oldMsg.id}`)
            .setTimestamp();

        client.channels.cache.get(logChannels[0]).send({ embeds: [editembed] });
    }
}