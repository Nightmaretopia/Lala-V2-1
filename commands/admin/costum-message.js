module.exports = {
    name: 'msg',
    description: 'Envia uma mensagem costumizada',
    execute({message, args}) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Você não tem permissão para usar este comando");
        if (!args[0]) return message.channel.send('Você não especificou em qual canal quer enviar a mensagem');
        
        let msg = args.slice(1).join(" ");
        if (!msg) return message.channel.send('A mensagem não é valida');
        
        let chn = args[0].replace(/\D/g, '');
        try {
            message.guild.channels.cache.get(chn).send(msg);
        } catch (err) {
            message.channel.send(`\`${args[0]}\` não é um canal valido`);
        }
    }
}