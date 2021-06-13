const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bane o membro mencionado',
    execute(message, args, target, client, reason) {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Você não tem permissão para usar este comando');
        if (!target) return message.channel.send('Você não disse quem quer banir');
        if (target.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.channel.send('Você não pode banir um moderador');
        if (message.guild.member(target)) {
            let banembed = new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setAuthor("Membro banido")
                .setDescription(`${target.user.tag} foi banido`);
            target.ban({reason})
                .then(() => {
                    message.channel.send(`${target.user.tag} foi banido`)
                        .then(message => {
                            message.delete({timeout: 3000})
                        })
                })
        }
    }
}