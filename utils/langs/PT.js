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
                        Versão: ${version}
    
    `),
    bot_start: "$bot.username iniciou em $bot.servers.size servidor(es).",
    bot_mongo_state_0: "Desligado da MongoDB",
    bot_mongo_state_1: "Ligado à MongoDB",
    bot_mongo_state_2: "A ligar à MongoDB",
    bot_mongo_state_3: "A desligar da MongoDB",
    error_exec: "Ocurreu um erro a tentar executar este comando",
    restarting: "A reiniciar...",
    restarted: "O bot foi reiniciado",
    sucefully_restarted: "```Reiniciado com sucesso!!!```",
    missing_permissions: "Não tens permissão para usar este comando",
    not_valid: "`$args` não é um comando válido",
    level_up: "<@$user.id> chegou ao nivel **$level**",
    bulk_delete: "Apagadas **$message.size** mensagens",
    avatar: "Avatar de $user.tag",
    icon: "Icon do(a) $guild.name",
    emoji_not_valid: "`$emoji` não é um emoji válido"
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