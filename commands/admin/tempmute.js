const Discord = require('discord.js');

module.exports = {
    name: 'tempmute',
    description: 'Muta temporariamente o membro mencionado',
    async execute({message, args, target, reasonarg}) {
        if (!message.member.permissions.has('MUTE_MEMBERS')) return message.channel.send('Você não tem permissão para usar este comando');
        if (!target) return message.channel.send("Você não especificou quem quer mutar")
            .then(message => {
                message.delete({timeout: 3000})
            });
        if (message.guild.member(target).roles.highest.position > message.guild.me.roles.highest.position) return message.channel.send('Você não pode mutar um moderador');
        let tempo = parseFloat(args[1]);
        if (!tempo) return message.channel.send('Você não falou por quanto tempo quer mutar o utilizador (em minutos)')
            .then(message => {
                message.delete({timeout: 3000})
            });
        const muterole = message.guild.roles.cache.find(r => r.name == "Lala Mute");
        const pos = message.guild.me.roles.highest.position;
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
        .setDescription(`${target.tag} foi mutado por ${tempo} minutos.\nRazão: ${reasonarg}`)
        .setTimestamp();
        message.guild.member(target).roles.add(muterole);
        setTimeout(() => {
            message.guild.member(target).roles.remove(muterole)
        },
        60000 * tempo);
        message.channel.send(mutembed);
    }
}