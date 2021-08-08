const Discord = require('discord.js');

module.exports = {
    event: 'messageDeleteBulk',
    name: 'Bulk Delete',
    execute(message, client) {
        let bulkembed = new Discord.MessageEmbed()
            .setColor(0xfc5603)
            .setAuthor("Purge")
            .setDescription(`Apagadas **${message.size}** mensagens`);

        // message.each(({message}) => message)
        console.log(message.clone())
            
        client.channels.cache.get('454111723872321536').send({embeds: [bulkembed]});
    }
}