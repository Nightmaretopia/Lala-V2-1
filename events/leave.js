const Discord = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        let bbch = bot.channels.cache.get('831258860857589832');
        let Leavelog = new Discord.MessageEmbed()
            .setColor("#f54245")
            .setThumbnail(member.user.displayAvatarURL())
            .setAuthor(`${member.user.username} | Saiu do servidor`, member.user.displayAvatarURL())
            .setDescription(`${member} ${member.user.tag}\n\n **Cargos**:\n${member.roles.cache.map(r => r)}`)
            .setFooter(`ID: ${member.id}`)
            .setTimestamp();

        let Leavemsg = new Discord.MessageEmbed()
            .setColor("#850816")
            .setAuthor(`${member.user.username} | Saiu do servidor`, member.user.displayAvatarURL())
            .setDescription(`Bye-bye, ${member.displayName}-kun...`)
            .setImage('https://cdn.discordapp.com/attachments/846471009950367824/846471370489069628/Lala_Tchau.gif')
            .setTimestamp();

        bbch.send(Leavemsg);
        bot.channels.cache.get('454111723872321536').send(Leavelog);
    }
}