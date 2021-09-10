const { MessageEmbed } = require("discord.js")
const nekoClient = require("nekos.life")

module.exports = {
    name: "neko",
    async execute({ int }) {
        const neko = new nekoClient()
        const type = int.options.getString("type").replace("type_", "")
        const embed = new MessageEmbed()
            .setColor(0x03d3fc)
            .setImage((await neko.sfw[type]()).url)

        int.reply({ embeds: [embed] })
    }
}