const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'messageDelete',
    execute(message) {
        if (message.channel.type == "dm") return;
        if (message.channel.id === '826862921405300786') return;
        if (message.author.bot) return;
        if (message.content.startsWith(prefix)) return;

        let imagepf = message.author.displayAvatarURL();
        let deletembed = new Discord.MessageEmbed()
            .setColor("#d442f5")
            .setAuthor(message.author.tag, imagepf)
            .setDescription(`**Mensagem de ${message.author} apagada em ${message.channel}**`)
            .addField("__Conteudo__", message.content)
            .setFooter(`${message.author.username} ID: ${message.author.id} | ID da Mensagem: ${message.id}`)
            .setTimestamp();

        bot.channels.cache.get('454111723872321536').send(deletembed);
    }
}