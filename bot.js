const Discord = require('discord.js');
const mongo = require('./mongo');
const fs = require('fs');
const { prefix, token, Owner, Coder } = require('./config.json');
const { manager, logger, bot, log } = require('./utils/manager');
const { colors } = require('./utils/color-manager');

const client = new Discord.Client({intents: 32511, partials: ['USER', 'REACTION', 'MESSAGE', 'GUILD_MEMBER', 'CHANNEL']});
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slcommands = new Discord.Collection();

client.on('ready', async () => {
    console.log(colors.customGrad(bot.translations(log.bot.test), colors.color("#0048ff"), colors.color("#b300ff"), colors.HSI, colors.Quadratic))
    colors.time(colors.fire(bot.translations(log.bot.login(client))))

    client.user.setActivity("To Love-Ru", {type: "WATCHING"});

    await mongo().then(async mongoose => {
        colors.time(colors.ice(bot.translations(log.bot.mongo(client, mongoose.connection.readyState))))
    })

    // await new Promise(resolve => setTimeout(resolve, 600))
    await manager.sleep(600)

    function setBot(location, cmdType, isEvents = false) {
        const folders = fs.readdirSync(`./${location}`)
        if (!isEvents) {
            for (const folder of folders) {
                const cmdFiles = fs.readdirSync(`./${location}/${folder}`);
                for (const file of cmdFiles) {
                    const command = require(`./${location}/${folder}/${file}`)
                    bot.commands(file, location, true)
                    cmdType.set(command.name, command)
                }
            }
        } else {
            for (const file of folders) {
                const event = require(`./${location}/${file}`);
                bot.events(file, true)
                client.on(event.event, (...args) => {
                    if (event.enable == 0) return;
                    event.execute(...args, client)
                });
                cmdType.set(event.name, event);
            };
        }
    }
    
    setBot('commands', client.commands);
    setBot('slash-commands', client.slcommands)
    setBot('events', client.events, true)

});

client.on('messageCreate', async (message) => {
    if (message.author.bot || message.channel.type == "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ /g);
    const cmd = args.shift().toLowerCase();
    const target = message.mentions.users.first();
    const reasonarg = manager.reason(args.slice(1).join(" "));

    if (message.content.startsWith(prefix)) {
        
        if (cmd === "restart") {
            if (!Coder || !Owner) return message.channel.send(bot.translations(log.errors.missing));
            message.channel.send(bot.translations(log.bot.restarting))
                .then(() => client.destroy())
                .then(() => client.login(token) && console.log(colors.rainbow(bot.translations(log.bot.restart))))
                .then(async () => await message.channel.send(bot.translations(log.bot.restarted)) && colors.time(colors.rainbow('Bot Restarted')))
        };

        if (cmd === "switch") {
            if (!message.member.permissions.has('ADMINISTRATOR')) return;
            if (!args[0]) return message.reply('Dumb Fuck');
            if (!client.commands.map(({name}) => name).includes(args[0])) return message.channel.send(bot.translations(log.errors.invalid(args)));
            const currentState = client.commands.get(args[0]).enable;
            const currentName = client.commands.get(args[0]).name;
            switch (currentState) {
                case 0: currentState = 1
                    message.channel.send(`\`${currentName}\` was enabled`);
                break
                case 1: currentState = 0
                    message.channel.send(`\`${currentName}\` was disabled`);
                break
                default: logger.error("Error")
                break
            }
        };

        if (cmd === "state") {
            if (!message.member.permissions.has('ADMINISTRATOR')) return;
            if (!args[0]) return message.reply('Dumb Fuck');
            if (!client.commands.map(({name}) => name).includes(args[0])) return message.channel.send(bot.translations(log.errors.invalid(args)));
            message.channel.send(client.commands.get(args[0]).enable)
        }

        if (!client.commands.has(cmd)) return;// || !client.commands.aliases.has(cmd)) return;
        const command = client.commands.get(cmd) || client.commands.aliases.get(cmd)

        try {
            if (command.enable == 0) return logger.error("Disabled");
            await command.execute({message, args, target, reasonarg});
        } catch (err) {
            console.error(err);
            await message.reply({content: bot.translations(log.bot.exec)})
        };
    }
});

client.on('interactionCreate', async (int) => {
    if (!int.isCommand()) return;
    if (!client.slcommands.has(int.commandName)) return;

    try {
        if (client.slcommands.get(int.commandName).enable == 0) return logger.error("Disabled")
        await client.slcommands.get(int.commandName).execute({int})
    } catch (err) {
        console.log(err);
        await int.reply({ content: bot.translations(log.bot.exec)});
    }
});

client.login(token);