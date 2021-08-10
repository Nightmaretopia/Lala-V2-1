const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "icon",
    enable: 1,
    async execute({int}) {
        const embed = new MessageEmbed()
            .setColor(0x00c5ff)
            .setImage(int.guild.iconURL({ size: 2048, dynamic: true }))
        int.reply({ embeds: [embed] })
    }
}