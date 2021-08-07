module.exports = {
    event: 'messageCreate',
    name: 'Annoy Toushiro',
    enable: 0,
    async execute(message) {
        let toushiro = '826306764320407554';
        if (message.author.bot) return;
        if (message.author.id !== toushiro) return;
            message.react('854359427570466817')
            message.reply('<:zerotwoayaya:854359427570466817>')
                .then(msg => msg.react('854359427570466817'))
    }
}