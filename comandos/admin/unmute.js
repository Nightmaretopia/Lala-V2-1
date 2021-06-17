const Discord = require('discord.js');
const { prefix } = require('../../config.json');

module.exports = {
    name: 'unmute',
    description: 'Tira o mute do membro mencionado',
    execute(message, target, client) {
        if (!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send('Você não tem permissão para usar este comando');
        if (!target) return message.channel.send('Você não especificou que quer mutar')
            .then(message => {
                message.delete({timeout: 3000})
            });
        if (message.guild.member(target).roles.highest.position > message.guild.resolve(client.user).roles.highest.position) return message.channel.send('Você não pode usar este comando em um moderador');
        const muterole = message.guild.roles.cache.find(r => r.name == "Lala Mute");
        if (!muterole) return message.channel.send(`O servidor não tem o mute configurado.\NUse \`${prefix}mute\` para configurar o mute.`);
        if (!message.guild.member(target).roles.cache.has(muterole.id)) return message.channel.send('Este membro não está mutado')
            .then(message => {
                message.delete({timeout: 3000})
            });
        let unmutembed = new Discord.MessageEmbed()
            .setColor(0x0000FF)
            .setTitle(`Desmutado ${target.tag}`)
            .setDescription(`${target.name} foi desmutado`)
            .setTimestamp();
        message.guild.member(target).roles.remove(muterole);
        message.channel.send(unmutembed);
    } 
}