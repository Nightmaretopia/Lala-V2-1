const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config.json');
const { guildModel } = require("../utils/schemas/guild-schema")

module.exports = {
    event: 'messageDelete',
    name: 'Message Delete',
    enable: 1,
    async execute(message, client) {
        if (message.channel.type == "dm") return;
        if (message.channel.id === '826862921405300786' || message.channel.id === "884571957473968189") return;
        if (message.partial) return;
        if (message.author.bot) return;
        if (message.content.startsWith(prefix)) return;

        const guild = await guildModel.findOne(
            {
                _id: message.guild.id
            },
            {
                logChannels: true
            }
        )
        if (!guild) return;
        const { logChannels } = guild

        let deletembed = new MessageEmbed()
            .setColor("#d442f5")
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`**Mensagem de ${message.author} apagada em ${message.channel}**`)
            .addField("__Conteudo__", message.content)
            .setFooter(`${message.author.username} ID: ${message.author.id} | ID da Mensagem: ${message.id}`)
            .setTimestamp();

        await client.channels.cache.get(logChannels[0]).send({ embeds: [deletembed] });
    }
}