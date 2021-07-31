const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bane o membro mencionado',
    execute({message, target, reasonarg, client}) {
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send('Você não tem permissão para usar este comando');
        if (!target) return message.channel.send('Você não disse quem quer banir');
        if (target.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.channel.send('Você não pode banir um moderador');
        if (message.guild.member.cache.get(target)) {
            let banembed = new MessageEmbed()
                .setColor("#FF0000")
                .setAuthor("Membro banido")
                .setDescription(`${target.user.tag} foi banido`);
            target.ban({reasonarg})
                .then(() => {
                    message.channel.send({ embeds: [banembed] })
                        .then(message => {
                            message.delete({timeout: 3000})
                        })
                })
        }
    }
}