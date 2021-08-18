module.exports = {
    name: "join",
    enable: 1,
    async execute({int}) {
        if (int.options.getUser('target')) {
            await int.client.emit('guildMemberAdd', int.options.getMember('target'));
            await int.reply({ content: 'Fake join deployed', ephemeral: true })
        } else {
            await int.client.emit('guildMemberAdd', int.member);
            await int.reply({ content: 'Fake join deployed', ephemeral: true })
        }
    }
}