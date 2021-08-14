const data = {
    bot_start: "$bot.username started on $bot.servers.size server(s).",
    bot_mongo_state_0: "Disconnected from MongoDBB",
    bot_mongo_state_1: "Connected to MongoDB",
    bot_mongo_state_2: "Connecting to MongoDB",
    bot_mongo_state_3: "Disconnecting from MongoDB",
    error_exec: "There was an error trying to execute this command",
    restarting: "Restaring...",
    restarted: "The bot was restarted",
    sucefully_restarted: "```Sucefully Restarted!!!```",
    missing_permissions: "You don't have permission to use this command",
    not_valid: "`$args` is not a valid command",
    level_up: "<@$user.id> reached level $level",
    bulk_delete: "Deleted **$message.size** messages",
    avatar: "$user.tag's Avatar",
    icon: "$guild.name's Icon"
}

module.exports = (event, client, args, guild, user, level, message) => {
    if(data[event] == undefined || data[event] == null || data[event] == "")
        return;

    let eventMessage = data[event].toString();

    if (eventMessage.indexOf("$bot.username") >= 0)
        eventMessage = eventMessage.replace("$bot.username", client.user.username);
        
    if (eventMessage.indexOf("$bot.servers.size") >= 0)
        eventMessage = eventMessage.replace("$bot.servers.size", client.guilds.cache.size);

    if (eventMessage.indexOf("$args") >= 0)
        eventMessage = eventMessage.replace("$args", args[0]);

    if (eventMessage.indexOf("$guild.name") >= 0)
        eventMessage = eventMessage.replace("$guild.name", guild.name)

    if (eventMessage.indexOf("$user.id") >= 0)
        eventMessage = eventMessage.replace("$user.id", user.id);

    if (eventMessage.indexOf("$user.tag") >= 0)
        eventMessage = eventMessage.replace("$user.tag", user.tag)

    if (eventMessage.indexOf("$level") >= 0)
        eventMessage = eventMessage.replace("$level", level);

    if (eventMessage.indexOf("$message.size") >= 0)
        eventMessage = eventMessage.replace("$message.size", message.size)

    return eventMessage
}