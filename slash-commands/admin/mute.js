const Discord = require("discord.js");
const profileSchema = require("../../utils/schemas/profile-schema");
const { manager } = require('../../utils/manager');

module.exports = {
    name: 'mute',
    enable: 0,
    async execute({int}) {
        if (!int.member.permissions.has('MUTE_MEMBERS')) return int.reply({ content: "You don't have permission to use this command" });

        const muteTarget = int.options.getMember('target');
        const muteRole = int.guild.roles.cache.find(role => role.name === "Zero Mute") // || get guild's mute role id **upcoming**
        const profile = await profileSchema.findOne(
            {
                _id: muteTarget.id,
            }
        );

        const pos = int.guild.me.roles.highest.position;
        if (!muteRole) {
            int.guild.roles.create(
                {
                    name: "Zero Mute",
                    position: pos - 1,
                    color: 0x242424
                }
            ).then(async r => {
                await int.guild.channels.cache.each(channel => {
                    channel.permissionOverwrite.edit(r, {
                        SEND_MESSAGES: false
                    })
                })
            })
        }

        const { isMuted } = await profile || false;
        if (isMuted == null) {
            await profileSchema.findOneAndUpdate(
                {
                    _id: muteTarget.id
                },
                {
                    name: muteTarget.user.username
                },
                {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                }
            )
        }
        async function isUserMuted(){
            if (isMuted || muteTarget.roles.cache.has(muteRole)){
                if (muteTarget.roles.cache.has(muteRole) && isMuted == false) {
                    await profileSchema.updateOne(
                        {
                            _id: muteTarget.id
                        },
                        {
                            isMuted: true
                        }
                    )
                }
                int.reply({ content: "This user is already muted" });
                return true
            } else {
                return false
            }
        }

        if(isUserMuted() === false) {
            muteTarget.roles.add(muteRole);

            await profileSchema.updateOne(
                {
                    _id: muteTarget.id
                },
                {
                    isMuted: true
                }
            )
            await int.reply({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("#FF0000")
                        .setTitle(`Mutado ${muteTarget.user.tag}`)
                        .setDescription(`${muteTarget.user.tag} foi mutado.\nRazão: ${manager.reason()}`)
                        .setTimestamp()
                ]
            });
        }
    }
}