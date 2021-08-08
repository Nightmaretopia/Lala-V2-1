const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'none for now',
    enable: 1,
    async execute({int}) {

        const embed = new MessageEmbed()
            .setColor("#FF0000")
            .setAuthor("Membro banido")

        if (int.options.getSubcommand() === "target") {
            const target = int.options.getMember('mention')
            let reason = int.options.getString('reason')
            !reason ? "Unknown" : reason
            target.ban({ reason: reason })

        } else if (int.options.getSubcommand() === "id") {
            const targetID = int.options.getString('id')
            const target = int.guild.members.cache.get(targetID)
            let reason = int.options.getString('reason')
            !reason ? "Unknown" : reason
            target.ban({ reason: reason })
        }
    }
}