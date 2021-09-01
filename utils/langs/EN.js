const { version } = require('../../package.json');

const data = {
    login: (`
                                                           ┌
                                                       ╓╛╔╛
                                                   ╒╖╦╪╪╬    ╒╓╓╓╓╕
              ┌═╤╛╙╟┌╢├  ╟╪╪╪╬╪╦╖             ╓╩ ╞╪╪╪╪╪╪╪╦╬╪╪╪╪╨╚╪╪ ╚╩╩╢╦╕
           ╒╧╬╕ ┌╦╓╦╤╤╪══╪╬╪╪╪╪╪╪╪╬╦╕    ╒ ╔╬╪╦╦╬╪╪╪╪╪╪╪╪╪╪╪╪╪╪╦ ╢╩   ╔╪╬╙╬╦
         ═│╣ ╕═╛              ╙╩╩╦╦╦╦╦╦╦╬╪╪╪╪╪╪╪╪╪╪╪╪╪╪╪╪╪╪╪╪╪╪╪╦╢╬╬╪╦╩    ╟╪╦
        ╬╢╥╔╜                    ╙╬╪╞╟╟╠╟╚╩╩╦╕    ╙╬╪╪╪╪╪╪╩╨          ╚╢╬╩╩  ╪╫
       ╬╪╪╬                         ╓╪╪╪╪╪╦    ╙╕  ╟╪╪╪╬╙               ╠╖╤╢╬╩╪╕
      ╒╪╪╪                           ╙╬╪╪╪╪╬╦    ═╒╪╪╩                   ╬╖  ╓╪╪
      ╘╪╪╪                             ╙╪╪╪╪╪╬┌ ╒╦╬╩                     ╪╖╖╦╖╪╡
       ╪╪╪┌                             ╙╬╪╪╪╪╩╔╬╘                      ╓╦   ╞╪
       ╘╪╪╬                         ╓┘    ╚╪╩╔╬│╢╦╕                   ╓╪ ╘╫╚╬╪
         ╣╪╬┐                   ╒╦╨          ╩ ╚╩╩╬╪╢╦╕           ╓╤╘╘ ╪╪═ ╓╩
           ╩╪╬╥             ╖╦╩╨               ╩╬╪╪╪╪╪╪╪╪╪╪╬╬╬╪╪╪╪╪╬╩  ╘╪╬╨
              ╚╩╬╬╦╦╦╦╦╦╬╩╩╙                      ╙╩╬╪╪╪╪╪╪╪╪╪╪╪╪╪╪╪╬╪╩╙
                                                      ┌ ╙╚╚╩╩╩╝╚╙
                        Version: ${version}
    
    `),
    bot_start: "$bot.username started on $bot.servers.size server(s).",
    bot_mongo_state_0: "$bot.username is Disconnected from MongoDB",
    bot_mongo_state_1: "$bot.username is Connected to MongoDB",
    bot_mongo_state_2: "$bot.username is Connecting to MongoDB",
    bot_mongo_state_3: "$bot.username is Disconnecting from MongoDB",
    error_exec: "There was an error trying to execute this command",
    restarting: "Restaring...",
    restarted: "The bot was restarted",
    sucefully_restarted: "```Sucefully Restarted!!!```",
    missing_permissions: "You don't have permission to use this command",
    not_valid: "`$args` is not a valid command",
    level_up: "<@$user.id> reached level **$level**",
    bulk_delete: "Deleted **$message.size** messages",
    avatar: "$user.tag's Avatar",
    icon: "$guild.name's Icon",
    emoji_not_valid: "`$emoji` is not a valid emoji",
    //comands
    kick: "Kicks the mentioned user",
    kick_target: "Mention the user you want to kick",
    kick_mention: "The user you want to kick",
    kick_id: "Send the id of the user you want to kick",
    kick_reason: "The reason to kick the user",
    ban: "Bans the mentioned user",
    ban_target: "Mention the user you want to ban",
    ban_mention: "The user you want to ban",
    ban_id: "Send the id of the user you want to ban",
    ban_reason: "The reason to ban the user",
    unban: "Unbans the user by its id",
    unban_id: "The id of the user to unban",
    unban_reason: "The reason to unban the user",
    avatar: "Gets the avatar from the mentioned member(s) or your own",
    mute: "Mutes the given user",
    mute_target: "The user to mute",
    mute_reason: "The reason to mute the user",
    tempmute: "Temporarily mutes the given user",
    tempmute_target: "The user to temporarily mute",
    tempmute_reason: "The reason to temporarily mute the user",
    avatar_target: "The users you want to get the avatars from",
    icon: "Gets the server icon and sends as an image",
    emoji: "Gets the image from an emoji",
    emoji_emoji: "Emoji to get the image from",
    emoji_id: "Gets the image from an emoji by its id",
    emoji_id_id: "Emoji id to get the image from",
}

module.exports = ({event, client, args, guild, user, level, message, emoji}) => {
    const events = {event}
    let eventMessage = data[(events.event)]?.toString();

    if (eventMessage?.indexOf("$bot.username") >= 0)
        eventMessage = eventMessage?.replace("$bot.username", client.user.username);
        
    if (eventMessage?.indexOf("$bot.servers.size") >= 0)
        eventMessage = eventMessage?.replace("$bot.servers.size", client.guilds.cache.size);

    if (eventMessage?.indexOf("$args") >= 0)
        eventMessage = eventMessage?.replace("$args", args[0]);

    if (eventMessage?.indexOf("$guild.name") >= 0)
        eventMessage = eventMessage?.replace("$guild.name", guild.name)

    if (eventMessage?.indexOf("$user.id") >= 0)
        eventMessage = eventMessage?.replace("$user.id", user.id);

    if (eventMessage?.indexOf("$user.tag") >= 0)
        eventMessage = eventMessage?.replace("$user.tag", user.tag)

    if (eventMessage?.indexOf("$level") >= 0)
        eventMessage = eventMessage?.replace("$level", level);

    if (eventMessage?.indexOf("$message.size") >= 0)
        eventMessage = eventMessage?.replace("$message.size", message.size)

        if (eventMessage?.indexOf("$emoji") >= 0)
        eventMessage = eventMessage?.replace("$emoji", emoji);

    return eventMessage
}