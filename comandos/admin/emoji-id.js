module.exports = {
    name: 'emojid',
    description: 'Obtem o id do emoji',
    execute(message, args) {
        message.delete({timeout: 30})
        if (!message.member.hasPermission('MANAGE_EMOJIS')) return message.channel.send('Você não tem permissão para usar este comando');
        message.channel.send(`\\${args[0]}`);
    }
}