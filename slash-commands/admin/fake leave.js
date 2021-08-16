module.exports = {
    name: "leave",
    enable: 1,
    async execute({int}) {
        if (int.options.getUser('target')) {
            await int.deferReply();
            await int.options.data.map(({member}) => member).forEach(async member => {
                let users = 0, message = [];
                message[users] = member
                await int.client.emit('guildMemberRemove', message[users]);
                users++
            });
            await int.followUp({ content: 'Fake leave deployed' })
        } else {
            await client.emit('guildMemberRemove', int.member);
            await int.reply({ content: 'Fake leave deployed', ephemeral: true })
        }
    }
}