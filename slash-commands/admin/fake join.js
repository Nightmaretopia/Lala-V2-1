module.exports = {
    name: "join",
    enable: 1,
    async execute({int, client}) {
        if (int.options.getUser('target')) {
            await client.emit('guildMemberAdd', int.options.getMember('target'));
            await int.reply({ content: 'Fake join deployed', ephemeral: true })
        } else {
            await client.emit('guildMemberAdd', int.member);
            await int.reply({ content: 'Fake join deployed', ephemeral: true })
            await int.followUp({ content: int.id })
        }
    }
}