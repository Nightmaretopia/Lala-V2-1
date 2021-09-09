const guildModel = require("../../utils/schemas/guild-schema")

module.exports = {
    name: "logs",
    async execute({ int }) {
        const channel = int.options.getChannel("channel")
        const guild = await guildModel.findOne(
            {
                _id: int.guild.id
            },
            {
                logChannels: true,
            }
        )
        if (guild === null) {
            await guildModel.create(
                {
                    _id: int.guild.id,
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                }
            )
            int.reply("Creating guild profile")
        } else {
            const { logChannels } = guild
            // if (!logChannels) {
            await guildModel.updateOne(
                {
                    _id: int.guild.id
                },
                {
                    $set: {
                        logChannels: channel.id
                    }
                },
                {
                    upsert: true,
                    new: true
                }
            )
            int.reply({ content: `Channel set to <#${channel.id}>` })
            // }
        }
        // int.reply("you failed")
    }
}