/*
module.exports = {
    name: "deploy",
    description: "smtg",
    async execute({message, client}) {
        if (!client.application?.owner) await client.application?.fetch();
        if (message.content.toLowerCase() === '!deploy' && message.author.id === client.application?.owner.id) {
            const data = {
                name: 'avatar',
                description: 'Envia o avatar da(s) pessoa(s) mencionada(s)',
            };

            const command = await client.guilds.cache.get('827545488835346493')?.commands(data).delete();
            message.channel.send('`Slash Commands deployed`')
        }
    }
}
*/