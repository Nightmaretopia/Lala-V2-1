const data = {
    bot_start: "$bot.username started on $bot.servers.size server(s).",
    bot_mongo_connect: "$bot.username connected to MongoDB",
    missing_permissions: "You don't have permission to use this command",
    restarting: "Restaring...",
    sucefully_restarted: "```Sucefully Restarted!!!```",
    not_valid: "`$args` is not a valid command",
}

module.exports = (event, client, args) => {
    if(data[event] == undefined || data[event] == null || data[event] == "")
        return;

    let message = data[event].toString();

    if(message.indexOf("$bot.username") >= 0)
        message = message.replace("$bot.username", client.user.username);
        
    if(message.indexOf("$bot.servers.size") >= 0)
        message = message.replace("$bot.servers.size", client.guilds.cache.size);

    if(message.indexOf("$args") >= 0)
        message = message.replace("$args", args[0]);

    return message
}