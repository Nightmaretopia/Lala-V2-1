const { MessageEmbed } = require('discord.js');
const { manager } = require('../utils/manager');
const guildModel = require("../utils/schemas/guild-schema")

module.exports = {
    event: 'messageDeleteBulk',
    name: 'Bulk Delete',
    async execute(message, client) {

        const guild = await guildModel.findOne(
            {
                _id: messgae.guild.id
            },
            {
                logChannels: true
            }
        )
        if (!guild) return;
        const { logChannels } = guild

        let bulkembed = new MessageEmbed()
            .setColor(0xfc5603)
            .setAuthor("Purge")
            .setDescription(manager.logger("bulk_delete", null, null, null, null, null, message));

        client.channels.cache.get(logChannels[0]).send({ embeds: [bulkembed] });
    }
}