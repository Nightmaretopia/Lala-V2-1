const Discord = require("discord.js");

module.exports = {
    name: 'mute',
    description: 'none for now',
    enable: 1,
    async execute({int}) {
        if (!int.member.permissions.has('MUTE_MEMBERS')) return int.reply({ content: "You don't have permission to use this command" });

        const muteTarget = int.options.getMember('target');
        const muteRole = int.guild.roles.cache.find(role => role.name === "Lala Mute") || await createMuteRole(int.guild);

        await muteTarget.roles.add(muteRole);

        int.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle(`Mutado ${muteTarget.tag}`)
                    .setDescription(`${muteTarget.tag} foi mutado.\nRazão: ${reasonarg}`)
                    .setTimestamp()
            ]
        });
    }
}

async function createMuteRole(guild) {
    const muteRole = await guild.roles.create({ name: "Lala Mute", color: 0x242424 });
    guild.channel.cache.forEach(channel => {
        if (channel.isThread()) return;

        channel.permissionOverwrites.set(
            [
                {
                    id: muteRole,
                    deny: ["SEND_MESSAGES"],
                }
            ]
        );
    });
    return muteRole;
}
