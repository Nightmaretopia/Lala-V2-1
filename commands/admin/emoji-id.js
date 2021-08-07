module.exports = {
    name: 'emojid',
    description: 'Obtem o id do emoji',
    execute({message, args}) {
        message.delete({timeout: 30})
        if (!message.member.permissions.has('MANAGE_EMOJIS')) return message.channel.send('Você não tem permissão para usar este comando');
        if (!args[0]) return message.reply('Você não especificou o emoji');
        const { isAnimated, emojiName, emojiId } = args[0].match(/^<(?<isAnimated>a?):(?<emojiName>\w+):(?<emojiId>\d+)>$/)?.groups ?? {};

        if (emojiName == emojiId || isAnimated == emojiId) return message.channel.send(`${emojiId} não é um emoji válido ou você não tem nitro`)
        message.channel.send(`\\<${isAnimated}:${emojiName}:${emojiId}>`);
    }
}