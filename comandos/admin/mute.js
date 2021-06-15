const Discord = require('discord.js')

module.exports = {
    name: 'mute',
    description: 'Muta o membro mencionado',
    async execute(message, args, target, reasonarg, client) {
        if (!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send('Você não tem permissão para usar este comando');
        if (!target) {
            return message.channel.send("Você não especificou quem quer mutar")
                .then(message => {
                    message.delete({timeout: 3000})
                })
        }
        if (message.guild.member(target).roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.channel.send('Você não pode mutar um moderador');

        const muterole = message.guild.roles.cache.find(r => r.name == "Lala Mute");

        if (!muterole) {
            message.guild.roles.create({ data: { name: "Lala Mute"}})
        }
        await muterole.permissions.remove('SEND_MESSAGES')
    }
}