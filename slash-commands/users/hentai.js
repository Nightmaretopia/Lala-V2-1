const { MessageEmbed } = require("discord.js")
const nekoClient = require("nekos.life")
const { manager } = require("../../utils/manager")

module.exports = {
    name: "hentai",
    async execute({ int }) {
        if (!int.channel.nsfw) return int.reply("This command can only be used in nsfw channels")

        const neko = new nekoClient()
        const embed = new MessageEmbed()
            .setColor(0xeb347a)
        const type = int.options.getString("type").replace("type_", "")

        const logic = manager.hentaiLogic(type)
        if (logic) {
            embed.setImage((await neko.nsfw[logic]()).url)
            int.reply({ embeds: [embed] })

        } else {
            embed.setImage((await neko.nsfw[type]()).url)
            int.reply({ embeds: [embed] })
        }
    }
}