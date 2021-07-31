const Discord = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Desbane o membro por id',
    execute({message, args}) {
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send('Você não tem permissão para usar este comando');
        let unbantarget = args[0];
        if (!unbantarget) return message.channel.send('Você não disse quem quer desbanir');
        if (args.lenght >= 1) {
            message.guild.members.unban(unbantarget)
                .then(() => {
                    message.channel.send(`Desbaniu <@${args[0]}> com sucesso`)
                    .then(message => {
                        message.delete({timeout: 3000})
                    })
                })
                .catch(err => {
                    message.reply('Este membro não está banido')
                        .then(message => {
                            message.delete({timeout: 3000})
                        })
                })
        }
    }
}