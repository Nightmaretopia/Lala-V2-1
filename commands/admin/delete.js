const { Owner, Coder } = require('../../config.json');

module.exports = {
    name: "deploy",
    async execute({message}) {
        if (message.author != Owner && message.author != Coder) return message.reply(bot.translations(log.errors.missing));
        if (!message.client.application?.owner) await message.client.application?.fetch();
        await message.client.guilds.cache.get('209700044763430912')?.commands.set([])
            .then(() => message.channel.send("**Deleted all Slash Commands**"))
    }
}