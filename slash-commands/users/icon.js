const { MessageEmbed } = require("discord.js");
const { manager } = require('../../utils/manager')

module.exports = {
    name: "icon",
    enable: 1,
    async execute({int}) {
        const embed = new MessageEmbed()
            .setColor(0x00c5ff)
            .setTitle(manager.logger("icon", null, null, int.guild))
            .setURL(int.guild.iconURL({ size: 2048, dynamic: true }))
            .setImage(int.guild.iconURL({ size: 2048, dynamic: true }))
        int.reply({ embeds: [embed] })
    }
}