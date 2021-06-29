const Discord = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Muta o membro mencionado',
    async execute({message, target, reasonarg, client}) {
        if (!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send('Você não tem permissão para usar este comando');
        if (!target) return message.channel.send("Você não especificou quem quer mutar")
            .then(message => {
                message.delete({timeout: 3000})
            });
        if (message.guild.member(target).roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.channel.send('Você não pode mutar um moderador');
        const muterole = message.guild.roles.cache.find(r => r.name == "Lala Mute");
        const pos = message.guild.members.resolve(client.user).roles.highest.position;
        if (!muterole) {
            message.guild.roles.create({ data: { name: "Lala Mute", permissions: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'], position: pos-1, color: 0x242424}})
                .then(async r => {
                    await message.guild.channels.cache.each((channel => {
                        channel.updateOverwrite(r, {
                            VIEW_CHANNEL: true,
                            SEND_MESSAGES: false,
                            READ_MESSAGE_HISTORY: true,
                            TALK: false,
                        })
                    }))
            })
        };
        if (message.guild.member(target).roles.cache.has(muterole.id)) return message.channel.send("Este membro já está mutado")
            .then(message => {
                message.delete({timeout: 3000})
            });
        let mutembed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle(`Mutado ${target.tag}`)
            .setDescription(`${target.tag} foi mutado.\nRazão: ${reasonarg}`)
            .setTimestamp();

        message.guild.member(target).roles.add(muterole);
        message.channel.send(mutembed);
    }
}