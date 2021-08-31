const { MessageEmbed } = require('discord.js');
const { manager } = require('../../utils/manager');
const fetch = require('node-fetch');

module.exports = {
    name: "emoji-id",
    async execute({int}){
        int.deferReply();
        const emoji = int.options.getString('emoji');
        const eurl = `https://cdn.discordapp.com/emojis/${emoji}`;

        const response = await fetch(eurl)
            .catch(err => console.log(err.message))

        if (!response.ok) {
            int.followUp({ content: manager.logger("emoji_not_valid", null, null, null, null, null, null, emoji) })
        } else {
            let emojiEmbed = new MessageEmbed()
                .setColor(0xff00ef)
                .setImage(eurl)
                .setFooter(int.member.username, int.member.displayAvatarURL())
                .setTimestamp()
            int.followUp({ embeds: [emojiEmbed] })
        }
    }
}