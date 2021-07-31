const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Manda um embed costumizado',
    execute({message, args}) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send("Você não tem permissão para usar este comando");
        if (!args[0]) return message.channel.send('Você não especificou em qual canal quer enviar a mensagem');

        let msg = args.slice(1).join(" ");
        if (!msg) return message.channel.send('A mensagem não é valida');
        
        let chn = args[0].replace(/\D/g, '');
        let costumembed = new Discord.MessageEmbed()
            .setColor("#d742fc")
            .setDescription(msg)
            .setFooter(`Mensagem enviada por ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp();
        try {
            message.guild.channels.cache.get(chn).send(costumembed);
        } catch (err) {
            message.channel.send(`\`${args[0]}\` não é um canal valido`);
        }
    }
}