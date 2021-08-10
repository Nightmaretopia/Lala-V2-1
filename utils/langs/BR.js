const data = {
    bot_start: "$bot.username iniciou em $bot.servers.size servidor(es).",
    bot_mongo_connect: "$bot.username connectado com MongoDB"
}

module.exports = (event, client) => {
    if(data[event] == undefined || data[event] == null || data[event] == "")
        return;

    let message = data[event].toString();

    if(message.indexOf("$bot.username") >= 0)
        message=message.replace("$bot.username", client.user.username);
        
    if(message.indexOf("$bot.servers.size") >= 0)
        message=message.replace("$bot.servers.size", client.guilds.cache.size);

    return message
}