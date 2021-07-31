const { Coder } = require('../../config.json')

module.exports = {
    name: 'status',
    description: 'Muda o estado do bot',
    execute({ message, args, client }) {
        if (message.author != Coder) return message.channel.send("Você não tem permissão para usar este comando");
        if (!args[0]) return message.channel.send('?');
        let resetstats = client.user.setActivity("To Love-Ru", {type: "WATCHING"});
        if (args[0] == 'reset') {
            resetstats;
            message.channel.send('Status resetado')
        } else {
            client.user.setActivity(args.slice(1).join(" "), {type: args.slice(0)});
            message.channel.send('Status Atualizado!')
        }
    }
}