const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "avatar",
    description: "teste",
    enable: 1,
    async execute({int}) {
        if (int.options.data.map(({user}) => user).length >= 1) {
            await int.deferReply()

            let i = 0, embed = [];
            await int.options.data.map(({user}) => user).forEach(user => {
                embed[i] = new MessageEmbed()
                    .setColor(0x0000FF)
                    .setTitle(`Avatar de ${user.tag}`)
                    .setURL(user.avatarURL({size: 2048, dynamic: true}))
                    .setImage(user.avatarURL({size: 2048, dynamic: true}));
                int.followUp({ embeds: [embed[i]] })
                i++
            });

        } else {
            const embed = new MessageEmbed()
                .setColor(0x0000FF)
                .setImage(int.user.avatarURL({size: 2048, dynamic: true}));
            return await int.reply( {embeds: [embed] })
        }
    }
}