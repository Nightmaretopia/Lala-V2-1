const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Envia o avatar da pessoa mencionada',
    execute(message) {
        message.delete({timeout: 30})
        let avatar = message.mentions.users.first() || message.author;
        let avatarEmb =  new Discord.MessageEmbed()
            .setColor("#0000FF")
            .setImage(avatar.avatarURL({size: 2048, dynamic: true}))

        message.channel.send(avatarEmb)
    }
}