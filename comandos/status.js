module.exports = {
    name: 'status',
    description: 'Muda o estado do bot',
    execute(message, args, client) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Você não tem permissão para usar este comando");
        if (!args[0]) return message.channel.send('?');
        let resetstats = client.user.setActivity("To Love-Ru", {type: "WATCHING"});
        if (args[0] == 'reset') {
            resetstats;
            message.channel.send('Status resetado')
        } else {
            client.user.setActivity(args.slice(0).join(" "));
            message.channel.send('Status atualizado');
        }
        
    }
}