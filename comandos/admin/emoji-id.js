module.exports = {
    name: 'emojid',
    description: 'Obtem o id do emoji',
    execute(message, args) {
        message.delete({timeout: 30})
        if (!message.member.hasPermission('MANAGE_EMOJIS')) return message.channel.send('Você não tem permissão para usar este comando');
        if (!args[0]) return message.reply('Você não especificou o emoji');
        const regexa = args[0].replace(/^<(a?):\w+:\d+>$/, '$1');
        const regexw = args[0].replace(/^<a?:(\w+):\d+>$/, '$1');
        const regexd = args[0].replace(/^<a?:\w+:(\d+)>$/, '$1');

        console.log(regexa + regexw + regexd)
        message.channel.send(`\\<${regexa}:${regexw}:${regexd}>`);
    }
}