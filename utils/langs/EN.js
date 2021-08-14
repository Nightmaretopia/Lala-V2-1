const data = {
    bot_start: "$bot.username started on $bot.servers.size server(s).",
    bot_mongo_state_0: "Disconnected from MongoDBB",
    bot_mongo_state_1: "Connected to MongoDB",
    bot_mongo_state_2: "Connecting to MongoDB",
    bot_mongo_state_3: "Disconnecting from MongoDB",
    error_exec: "There was an error trying to execute this command",
    restarting: "Restaring...",
    sucefully_restarted: "```Sucefully Restarted!!!```",
    missing_permissions: "You don't have permission to use this command",
    not_valid: "`$args` is not a valid command",
    level_up: "<@$userID> reached level $level"
}

module.exports = (event, client, args) => {
    if(data[event] == undefined || data[event] == null || data[event] == "")
        return;

    let message = data[event].toString();

    if (message.indexOf("$bot.username") >= 0)
        message = message.replace("$bot.username", client.user.username);
        
    if (message.indexOf("$bot.servers.size") >= 0)
        message = message.replace("$bot.servers.size", client.guilds.cache.size);

    if (message.indexOf("$args") >= 0)
        message = message.replace("$args", args[0]);

    if (message.indexOf("$userID") >= 0)
        message = message.replace("$userID", message.author.id);

    if (message.indexOf("$level") >= 0)
        message = message.replace("$level", level);

    return message
}