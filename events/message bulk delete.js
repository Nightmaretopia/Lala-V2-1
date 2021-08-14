const { MessageEmbed } = require('discord.js');
const { manager } = require('../utils/manager');

module.exports = {
    event: 'messageDeleteBulk',
    name: 'Bulk Delete',
    execute(message, client) {
        let bulkembed = new MessageEmbed()
            .setColor(0xfc5603)
            .setAuthor("Purge")
            .setDescription(manager.logger("bulk_delete", null, null, null, null, null, message));
            
        client.channels.cache.get('454111723872321536').send({embeds: [bulkembed]});
    }
}