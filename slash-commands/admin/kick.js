const { MessageEmbed } = require('discord.js');
const { reason } = require('../../utils/manager')

module.exports = {
    name: 'kick',
    description: 'none for now',
    enable: 1,
    async execute({int}) {

        if (!int.member.permissions.has('KICK_MEMBERS')) return int.reply({ content: "You don't have permission to use this command" });

        const embed = new MessageEmbed()
            .setColor("#FF0000")
            .setAuthor("Membro kickado")

        if (int.options.getSubcommand() === "target") {
            const target = int.options.getMember('mention');
            let r = int.options.getString('reason');
            target.kick({ reason: reason(r) });
            embed.setDescription(`${target.user.tag} foi kickado\n**Motivo:** ${reason(r)}`);
            await int.reply({ embeds: [embed] });

        } else if (int.options.getSubcommand() === "id") {
            const targetID = int.options.getString('id');
            const target = int.guild.members.cache.get(targetID);
            if (!target) return int.reply('This user is not in this server');
            let r = int.options.getString('reason');
            target.kick({ reason: reason(r) });
            embed.setDescription(`${target.user.tag} foi kickado\n**Motivo:** ${reason(r)}`);
            await int.reply({ embeds: [embed] });
        }
    }
}