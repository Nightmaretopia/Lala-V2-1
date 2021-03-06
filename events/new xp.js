const { MessageEmbed } = require('discord.js');
const profileSchema = require('../utils/schemas/profile-schema');
const { pfManager, manager } = require('../utils/manager');

module.exports = {
    event: "messageCreate",
    name: "XP New",
    enable: 1,
    async execute(message) {
        if (message.author.bot) return;

        const user = message.author;
        const userName = message.author.username
        const userId = user.id
        let min = 15;
        let max = 30;
        const addxp = Math.floor(Math.random() * (max - min)) + min;
        const profile = await profileSchema.findOneAndUpdate(
            {
                _id: userId
            },
            {
                name: userName,
                $inc: {
                    xp: addxp
                }
            },
            {
                upsert: true,
                new: true
            }
        )

        let { xp, level, name } = profile;

        let needed = await pfManager.nextlvl(userId)

        if (xp >= needed) {
            level++

            const lvlupemb = new MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setDescription(manager.logger("level_up", null, null, null, user, level))
            await message.channel.send({embeds: [lvlupemb]})

            await profileSchema.updateOne(
                {
                    _id: userId
                },
                {
                    level,
                }
            )
        }
        console.log(`---------------\nUser: ${name}\nAdded: ${addxp}\nXP: ${xp}\nLevel: ${level}\nNextLvL: ${needed}\nLastLvL: ${await pfManager.lastlvl(userId)}\n---------------`)
    }
}
