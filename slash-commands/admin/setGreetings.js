const guildModel = require("../../utils/schemas/guild-schema")

module.exports = {
    name: "greetings",
    async execute({ int }) {
        const channel = int.options.getChannel("channel")
        const guild = await guildModel.findOne(
            {
                _id: int.guild.id
            },
            {
                welcomeChannel: true,
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
            const { welcomeChannel } = guild
            if (!welcomeChannel) {
                console.log("Detected")
                int.reply("Check your console")
            }
        }
    }
}