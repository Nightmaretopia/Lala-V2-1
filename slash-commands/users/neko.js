const { MessageEmbed } = require("discord.js")
const nekoClient = require("nekos.life")

module.exports = {
    name: "neko",
    async execute({ int }) {
        const neko = new nekoClient()
        let type = int.options.getString("type").replace("type_", "")

        if (type === "neko") {
            const arr = ["neko", "nekoGif"]
            const a = Math.round(Math.random())
            console.log(a)
            type = arr[a]
        }

        const embed = new MessageEmbed()
            .setColor(0x03d3fc)
            .setImage((await neko.sfw[type]()).url)

        int.reply({ embeds: [embed] })
    }
}