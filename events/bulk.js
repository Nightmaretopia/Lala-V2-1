const Discord = require('discord.js');

module.exports = {
    event: 'messageDeleteBulk',
    name: 'Bulk Delete',
    execute(message, client) {
        let bulkembed = new Discord.MessageEmbed()
            .setColor(0xfc5603)
            .setAuthor("Purge")
            .setDescription(`Apagadas **${message.size}** mensagens`);
            
        client.channels.cache.get('454111723872321536').send({embeds: [bulkembed]});
    }
}