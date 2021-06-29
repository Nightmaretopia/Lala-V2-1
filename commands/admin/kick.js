const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'Kicka o membro mencionado',
    execute({message, target, reasonarg, client}) {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Você não tem permissão para usar este comando');
        if (!target) return message.channel.send('Você não disse quem quer kickar');
        if (target.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.channel.send('Você não pode banir um moderador');        
        if (message.guild.member(target)) {
            let kickembed = new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setAuthor("Membro kickado")
                .setDescription(`${target.user.tag} foi kickado`);
            target.kick({reasonarg})
                .then(() => {
                    message.channel.send(`${target.user.tag} foi kickado`)
                        .then(message => {
                            message.delete({timeout: 3000})
                        })
                })
        }
    }
}