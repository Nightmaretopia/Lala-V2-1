const { MessageEmbed } = require("discord.js")
const nekoClient = require("nekos.life")

module.exports = {
    name: "ero",
    async execute({ int }) {
        if (!int.channel.nsfw) return int.reply("This command can only be used in nsfw channels")

        const neko = new nekoClient()
        const type = int.options.getString("type").replace("type_", "")

        const embed = new MessageEmbed()
            .setColor(0xfc8c03)
            .setImage((await neko.nsfw[type]()).url)

        int.reply({ embeds: [embed] })
    }
}