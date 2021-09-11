const { MessageEmbed } = require("discord.js")
const { pfManager } = require("../../utils/manager")

module.exports = {
    name: "rank",
    async execute({ int }) {

        const guildId = int.guild.id
        const userId = int.member.id

        const difference = await pfManager.nextlvl(guildId, userId) - await pfManager.getxp(guildId, userId)

        const lvlembed = new MessageEmbed()
            .setAuthor(int.member.user.username)
            .setThumbnail(int.member.user.displayAvatarURL())
            .setColor("0000FF")
            .addFields(
                { name: "Level", value: (await pfManager.getlvl(guildId, userId)).toString(), inline: true },
                { name: "XP", value: (await pfManager.getxp(guildId, userId)).toString(), inline: true }
            )
            .setFooter(`${difference} XP para subir de nivel`, int.member.user.displayAvatarURL())

        int.reply({ embeds: [lvlembed] })
    }
}