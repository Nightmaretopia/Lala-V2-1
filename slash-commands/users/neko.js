const { MessageEmbed } = require("discord.js")
const nekoClient = require("nekos.life")

module.exports = {
    name: "neko",// && "neko-gif",
    async execute({ int }) {
        const neko = new nekoClient()
        const embed = new MessageEmbed().setColor(0x3000FF)
        // if (int.commandName === "neko-gif") {
        //     embed.setImage((await neko.sfw.nekoGif()).url)
        //     int.reply({ embeds: [embed] })
        // } else {
        const type = int.options.getString("type")
        console.log(type)

        if (type === "neko") {
            embed.setImage((await neko.sfw.neko()).url)
            int.reply({ embeds: [embed] })
        } else if (type === "smug") {
            embed.setImage((await neko.sfw.smug()).url)
            int.reply({ embeds: [embed] })
        }
        // }
    }
}