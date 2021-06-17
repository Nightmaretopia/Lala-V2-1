const Discord = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    async execute(oldMemb, newMemb) {
        if (!oldMemb.guild) return;
        if (oldMemb.user.bot) return;
    }
}