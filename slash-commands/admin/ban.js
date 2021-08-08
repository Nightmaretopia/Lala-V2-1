const { MessageEmbed } = require('discord.js');
const { reason } = require('../../utils/manager')

module.exports = {
    name: 'ban',
    description: 'none for now',
    enable: 1,
    async execute({int, client}) {

        if (!int.member.permissions.has('BAN_MEMBERS')) return int.reply({ content: "You don't have permission to use this command" })

        const embed = new MessageEmbed()
            .setColor("#FF0000")
            .setAuthor("Membro banido")

        if (int.options.getSubcommand() === "target") {
            const target = int.options.getMember('mention')
            
            let r = int.options.getString('reason')
            target.ban({ reason: reason(r) })
            embed.setDescription(`${target.user.tag} foi banido\n**Motivo:** ${reason(r)}`)
            await int.reply({ embeds: [embed] })

        } else if (int.options.getSubcommand() === "id") {
            const targetID = int.options.getString('id')
            const target = int.guild.members.cache.get(targetID)
            let r = int.options.getString('reason')
            target.ban({ reason: reason(r) })
            embed.setDescription(`${target.user.tag} foi banido\n**Motivo:** ${reason(r)}`)
            await int.reply({ embeds: [embed] })
        }
    }
}