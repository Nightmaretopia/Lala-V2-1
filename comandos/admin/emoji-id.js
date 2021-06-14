module.exports = {
    name: 'emojid',
    description: 'Obtem o id do emoji',
    execute(message, args) {
        message.delete({timeout: 30})
        if (!message.member.hasPermission('MANAGE_EMOJIS')) return message.channel.send('Você não tem permissão para usar este comando');
        if (!args[0]) return message.reply('Você não especificou o emoji');
        const regex1 = args[0].replace(/^<(a?):\w+:\d+>$/, '$1');
        const regex2 = args[0].replace(/^<a?:(\w+):\d+>$/, '$1');
        const regex3 = args[0].replace(/^<a?:\w+:(\d+)>$/, '$1');

        console.log(regex1 + regex2 + regex3)
        message.channel.send(`\\<${regex1}:${regex2}:${regex3}>`);
    }
}