const { MessageEmbed } = require('discord.js');
const { reason } = require('../../utils/manager')

module.exports = {
    name: "unban",
    description: "none",
    enable: 1,
    async execute({int}) {
        if (!int.member.permissions.has('BAN_MEMBERS')) return int.reply({ content: "You don't have permission to use this command" });

        const targetID = int.options.getString('id');
        const target = int.guild.members.cache.get(targetID);
        if (!target) return int.reply('This user is not in this server');
        // let r = int.options.getString('reason');
        let embed = new MessageEmbed()
            .setColor()
            .setAuthor('Membro desbanido')
            .setDescription(`<@${targetID}> foi desbanido`)
        target.unban();
        await int.reply({ embeds: [embed] })        
    }
}