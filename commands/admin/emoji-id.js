module.exports = {
    name: 'emojid',
    description: 'Obtem o id do emoji',
    execute({message, args}) {
        message.delete({timeout: 30})
        if (!message.member.permissions.has('MANAGE_EMOJIS')) return message.channel.send('Você não tem permissão para usar este comando');
        if (!args[0]) return message.reply('Você não especificou o emoji');
        const regexa = args[0].replace(/^<(a?):\w+:\d+>$/, '$1');
        const regexw = args[0].replace(/^<a?:(\w+):\d+>$/, '$1');
        const regexd = args[0].replace(/^<a?:\w+:(\d+)>$/, '$1');

        if (regexw == regexd || regexa == regexd) return message.channel.send(`${regexd} não é um emoji válido ou você não tem nitro`)
        message.channel.send(`\\<${regexa}:${regexw}:${regexd}>`);
    }
}