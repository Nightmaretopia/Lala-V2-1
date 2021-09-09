const { MessageEmbed } = require('discord.js');
const guildModel = require("../utils/schemas/guild-schema")

module.exports = {
    event: 'guildMemberRemove',
    name: 'Leave',
    enable: 1,
    async execute(member, client) {

        const guild = await guildModel.findOne(
            {
                _id: member.guild.id
            },
            {
                welcomeChannel: true,
                logChannels: true
            }
        )
        if (!guild) return;
        const { welcomeChannel, logChannels } = guild

        let Leavelog = new MessageEmbed()
            .setColor(0xf54245)
            .setThumbnail(member.user.displayAvatarURL())
            .setAuthor(`${member.user.username} | Saiu do servidor`, member.user.displayAvatarURL())
            .setDescription(`${member} ${member.user.tag}\n\n **Cargos**:\n${member.roles.cache.map(r => r)}`)
            .setFooter(`ID: ${member.id}`)
            .setTimestamp();

        let Leavemsg = new MessageEmbed()
            .setColor(0x850816)
            .setAuthor(`${member.user.username} | Saiu do servidor`, member.user.displayAvatarURL())
            .setDescription(`Bye-bye, ${member.displayName}-kun...`)
            .setImage('https://cdn.discordapp.com/attachments/846471009950367824/846471370489069628/Lala_Tchau.gif')
            .setTimestamp();

        client.channels.cache.get(welcomeChannel).send({ embeds: [Leavemsg] })
        client.channels.cache.get(logChannels[0]).send({ embeds: [Leavelog] });
    }
}