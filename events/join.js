const { MessageEmbed } = require("discord.js");
const guildModel = require("../utils/schemas/guild-schema");
const { logger } = require("../utils/manager");

module.exports = {
    name: "join",
    event: "guildMemberAdd",
    async execute(member, client) {
        const guildId = member.guild.id;
        const userId = member.user.id;
        const guild = await guildModel.findOne(
            {
                _id: guildId,
            },
            {
                defaultRoleID,
                welcomeChannel,
            }
        );

        const { defaultRoleID, welcomeChannel } = guild;
        if (!(defaultRoleID || welcomeChannel)) {
            return logger.error(
                `${member.guild.name} doesn't have a welcomeChannel set`
            );
        }
    },
};
