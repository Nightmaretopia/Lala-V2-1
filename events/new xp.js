const { MessageEmbed } = require('discord.js');
const profileModel = require('../utils/schemas/profile-schema');
const { pfManager, log } = require('../utils/manager');

module.exports = {
    event: "messageCreate",
    name: "XP New",
    enable: 1,
    async execute(message) {
        if (message.author.bot) return;

        const guildId = message.guild.id
        const user = message.author;
        const userName = message.author.username
        const userTag = message.author.tag
        const userId = user.id
        let min = 15;
        let max = 30;
        const addxp = Math.floor(Math.random() * (max - min)) + min;
        const profile = await profileModel.findOneAndUpdate(
            {
                guildID: guildId,
                userID: userId
            },
            {
                name: userName,
                tag: userTag,
                $inc: {
                    xp: addxp
                }
            },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        )

        let { xp, level, name } = profile;

        const needed = await pfManager.nextlvl(guildId, userId)

        if (xp >= needed) {
            level++

            const lvlupemb = new MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setDescription(log.messages.level(user, level))
            await message.channel.send({ embeds: [lvlupemb] })

            await profileModel.updateOne(
                {
                    guildID: guildId,
                    userID: userId
                },
                {
                    level,
                }
            )
        }
        console.log(`---------------\nUser: ${name}\nTag: ${userTag}\nAdded: ${addxp}\nXP: ${xp}\nLevel: ${level}\nNextLvL: ${needed}\n---------------`)
    }
}
