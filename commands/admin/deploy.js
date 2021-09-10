const SlashBuilder = require('../../utils/slash-builder');
const { SlashCommandBuilder } = require("@discordjs/builders")
const { log } = require('../../utils/manager')
const { Owner, Coder } = require('../../config.json');

module.exports = {
    name: "deploy",
    async execute({ message }) {
        if (message.author != Owner && message.author != Coder) return message.reply(bot.translations(log.errors.missing));
        if (!message.client.application?.owner) await message.client.application?.fetch();

        const kick = new SlashBuilder()
            .setName("Kick")
            .setDescription(log.commands.kick.description)
            .addSubCommand("Target", log.commands.kick.target, [
                {
                    name: "mention",
                    description: log.commands.kick.mention,
                    type: "USER",
                    required: true
                }, {
                    name: "reason",
                    description: log.commands.kick.reason,
                    type: "STRING"
                }
            ])
            .addSubCommand("Id", log.commands.kick.id, [
                {
                    name: "id",
                    description: log.commands.kick.id,
                    type: "STRING",
                    required: true
                }, {
                    name: "reason",
                    description: log.commands.kick.reason,
                    type: "STRING"
                }
            ])

        const ban = new SlashBuilder()
            .setName("Ban")
            .setDescription(log.commands.ban.description)
            .addSubCommand("Target", log.commands.ban.target, [
                {
                    name: "mention",
                    description: log.commands.ban.mention,
                    type: "USER",
                    required: true
                }, {
                    name: "reason",
                    description: log.commands.ban.reason,
                    type: "STRING"
                }
            ])
            .addSubCommand("Id", log.commands.ban.id, [
                {
                    name: "id",
                    description: log.commands.ban.id,
                    type: "STRING",
                    required: true
                }, {
                    name: "reason",
                    description: log.commands.ban.reason,
                    type: "STRING"
                }
            ])

        const unban = new SlashBuilder()
            .setName("Unban")
            .setDescription(log.commands.unban.description)
            .addString("Id", log.commands.unban.id, true)
            .addString("Reason", log.commands.unban.reason)

        const mute = new SlashBuilder()
            .setName("Mute")
            .setDescription(log.commands.mute.description)
            .addUser("Tagret", log.commands.mute.target, true)
            .addString("Reason", log.commands.mute.reason)

        const tempmute = new SlashBuilder()
            .setName("Tempmute")
            .setDescription(log.commands.tempmute.description)
            .addUser("Tagret", log.commands.tempmute.target, true)
            .addString("Reason", log.commands.tempmute.reason)

        const avatar = new SlashBuilder()
            .setName("Avatar")
            .setDescription(log.commands.avatar.description)
            .addString("Mentions", log.commands.avatar.targets)

        const icon = new SlashBuilder()
            .setName("Icon")
            .setDescription(log.commands.icon)

        const emoji = new SlashBuilder()
            .setName("Emoji")
            .setDescription(log.commands.emoji.description)
            .addString("Emoji", log.commands.emoji.action, true)

        const status = new SlashBuilder()
            .setName("Status")
            .setDescription("Change the bot status")
            .setDefaultPermission(false)
            .addString("Status", "Bot Status")
            .addNumber("Type", "Playing 🠖 0   Streaming 🠖 1   Listening 🠖 2   Watching 🠖 3    Custom 🠖 4  Competing 🠖 5")
            .addString("Reset", "Rest bot status to default")

        const join = new SlashBuilder()
            .setName("Join")
            .setDescription("Fakes a join")
            .setDefaultPermission(false)
            .addUser("Target", "The user to fake (LoL)")

        const leave = new SlashBuilder()
            .setName("Leave")
            .setDescription("Fakes a Leave")
            .setDefaultPermission(false)
            .addUser("Target", "The user to fake (LoL)")

        const setGreetings = new SlashBuilder()
            .setName("greetings")
            .setDescription("set the welcome and goodbye channel")
            .addChannel("channel", "the channel to set", true)

        const setLogs = new SlashBuilder()
            .setName("logs")
            .setDescription("set the logs channel of the server")
            .addChannel("channel", "channel of your choice", true)

        const play = new SlashBuilder()
            .setName("Play")
            .setDescription("Plays a song")
            .addString("link", "The link for the song (Youtube Only for now)", true)

        const neko = new SlashCommandBuilder()
            .setName("neko")
            .setDescription("Sends a picture or gif from nekos.life")
            .addStringOption(option =>
                option.setName("type")
                    .setDescription("What type of image")
                    .setRequired(true)
                    .addChoices([
                        ["smug", "type_smug"],
                        ["baka", "type_baka"],
                        ["tickle", "type_tickle"],
                        ["poke", "type_poke"],
                        ["neko", "type_neko"],
                        ["nekoGif", "type_nekoGif"],
                        ["foxGirl", "type_foxGirl"],
                        ["kemonomimi", "type_kemonomimi"],
                        ["holo", "type_holo"],
                        ["wallpaper", "type_wallpaper"],
                        ["gecg", "type_gecg"],
                        ["avatar", "type_avatar"],
                    ])
            )

        const command = await message.client.guilds.cache.get(message.guild.id)?.commands.set([kick, ban, unban, mute, tempmute, avatar, icon, emoji, status, join, leave, setGreetings, setLogs, play, neko])
        // console.log(command)

        message.channel.send('**Slash Commands Deployed!**');
    }
}
