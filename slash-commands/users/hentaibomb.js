const { MessageEmbed } = require("discord.js");
const nekoClient = require("nekos.life");
const { manager } = require("../../utils/manager")

module.exports = {
    name: "hentaibomb",
    async execute({ int }) {
        if (!int.channel.nsfw) return int.reply("This command can only be used in nsfw channels")
        let type = int.options.getString("type");
        const amount = int.options.getInteger("amount");
        const neko = new nekoClient()
        const embed = new MessageEmbed()
            .setColor(0x9534eb)
        if (amount > 10) return int.reply("You can only send a max of 10 images");
        int.deferReply()
        let x = amount ? amount : 3;

        if (!type) {
            const types = ["randomHentaiGif", "pussy", "neko", "lesbian", "kuni", "cumsluts", "classic", "boobs", "anal", "avatar", "yuri", "trap", "tits", "girlSolo", "kemonomimi", "kitsune", "keta", "hentai", "futanari", "femdom", "feet", "cumArts", "blowJob"]

            for (let i = 0; i < x; i++) {
                const b = Math.round(Math.random() * 22)
                allTypes = types[b]
                const logic = manager.hentaiLogic(allTypes)

                if (logic) {
                    embed.setImage((await neko.nsfw[logic]()).url)
                    int.followUp({ embeds: [embed] })
                } else {
                    embed.setImage((await neko.nsfw[allTypes]()).url)
                    int.followUp({ embeds: [embed] })
                }

            }
        } else {
            type = type.replace("type_", "")
            for (let i = 0; i < x; i++) {
                const b = Math.round(Math.random() * 22)
                const logic = manager.hentaiLogic(type)

                if (logic) {
                    embed.setImage((await neko.nsfw[logic]()).url)
                    int.followUp({ embeds: [embed] })
                } else {
                    embed.setImage((await neko.nsfw[type]()).url)
                    int.followUp({ embeds: [embed] })
                }
            }
        }
    }
}