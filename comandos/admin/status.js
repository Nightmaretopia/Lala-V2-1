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
            if(args[0].toLowerCase() == "jogando")
                client.user.setActivity(args.slice(1).join(" "), {type: "PLAYING"});
            else if(args[0].toLowerCase() == "transmitindo" || args[0].toLowerCase() == "streamando")
                client.user.setActivity(args.slice(1).join(" "), {type: "STREAMING"});
            else if(args[0].toLowerCase() == "ouvindo")
                client.user.setActivity(args.slice(1).join(" "), {type: "LISTENING"});
            else if(args[0].toLowerCase() == "assistindo")
                client.user.setActivity(args.slice(1).join(" "), {type: "WATCHING"});
            else if(args[0].toLowerCase() == "competindo")
                client.user.setActivity(args.slice(1).join(" "), {type: "COMPETING"});
            else
                client.user.setActivity(args.slice(0).join(" "), {type: "CUSTOM_STATUS"});
            
            message.channel.send('Status atualizado');
        }
        
    }
}
