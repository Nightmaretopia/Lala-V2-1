module.exports = {
    event: 'guildMemberAdd',
    name: 'Anti-Raid',
    execute(member) {
        if (Date.now() - member.user.createdAt < 1000*60*60*2) return member.ban({days: 7, reason: 'Raid acc?'});
    }
}