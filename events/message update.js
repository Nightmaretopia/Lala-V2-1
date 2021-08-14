const Discord = require('discord.js');

module.exports = {
    event: 'messageUpdate',
    name: 'Message Updates',
    execute(oldMsg, newMsg, client) {
        if (oldMsg.partial) return;
        if (!oldMsg.guild) return;
        if (!oldMsg.content) return;
        if (oldMsg.username.bot) return;
        if (newMsg.content === oldMsg.content) return;
    
        let pfimage = newMsg.author.displayAvatarURL()
        let editembed = new Discord.MessageEmbed()
            .setColor("#fcba03")
            .setAuthor(newMsg.author.tag, pfimage)
            .setDescription(`**Mensagem editada em ${newMsg.channel}**`)
            .addField('**Mensagem Antiga**', oldMsg.content)
            .addField('**Mensagem Nova**', newMsg.content)
            .setFooter(`${oldMsg.author.username} ID: ${oldMsg.author.id} | ID da Mensagem: ${oldMsg.id}`)
            .setTimestamp();

        client.channels.cache.get('454111723872321536').send({embeds: [editembed]});    
    }
}