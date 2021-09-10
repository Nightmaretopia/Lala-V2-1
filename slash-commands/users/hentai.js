const { MessageEmbed } = require("discord.js")
const nekoClient = require("nekos.life")

module.exports = {
    name: "hentai",
    async execute({ int }) {
        if (!int.channel.nsfw) return int.reply("This command can only be used in nsfw channels")

        const neko = new nekoClient()
        let type = int.options.getString("type").replace("type_", "")

        if (type === "blowJob") {
            const arr = ["bJ", "blowJob"]
            const a = Math.round(Math.random())
            console.log(a)
            type = arr[a]
        }

        if (type === "neko") {
            const arr = ["nekoGif", "neko"]
            const a = Math.round(Math.random())
            console.log(a)
            type = arr[a]
        }

        if (type === "feet") {
            const arr = ["feetGif", "feet"]
            const a = Math.round(Math.random())
            console.log(a)
            type = arr[a]
        }

        if (type === "pussy") {
            const arr = ["pussy", "pussyWankGif", "pussyArt"]
            const a = Math.round(Math.random() * 2)
            console.log(a)
            type = arr[a]
        }

        if (type === "girlSolo") {
            const arr = ["girlSolo", "girlSoloGif"]
            const a = Math.round(Math.random())
            console.log(a)
            type = arr[a]
        }

        const embed = new MessageEmbed()
            .setColor(0xeb347a)
            .setImage((await neko.nsfw[type]()).url)

        int.reply({ embeds: [embed] })
    }
}