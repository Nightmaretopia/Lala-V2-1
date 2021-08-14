const Discord = require('discord.js');
const { prefix, token, Owner, Coder } = require('./config.json');
const mongo = require('./mongo');
const fs = require('fs');
const { manager } = require('./utils/manager')
const { logs, colors } = require('./utils/color-manager');

const client = new Discord.Client({intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING', 'GUILDS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS', 'GUILD_INVITES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES', 'GUILD_WEBHOOKS'], partials: ['USER', 'REACTION', 'MESSAGE', 'GUILD_MEMBER', 'CHANNEL']});
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slcommands = new Discord.Collection();
const commandsFolder = fs.readdirSync('./commands')
const eventFiles = fs.readdirSync('./events').filter(f => f.endsWith('.js'));
const slcommandsFolder = fs.readdirSync('./slash-commands')

for (const folder of commandsFolder) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`);
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
};

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.event, (...args) => {
        if (event.enable == 0) return;
        event.execute(...args, client)
    });
    client.events.set(event.name, event);
};

for (const folder of slcommandsFolder) {
    const slCommandsFiles = fs.readdirSync(`./slash-commands/${folder}`);
    for (const file of slCommandsFiles) {
        const slCommand = require(`./slash-commands/${folder}/${file}`);
        client.slcommands.set(slCommand.name, slCommand);
    }
};

client.on('ready', async () => {

    logs.fire(manager.logger("bot_start", client))
    client.user.setActivity("To Love-Ru", {type: "WATCHING"});

    await mongo().then(async (mongoose) => {
        logs.ice(`${client.user.username} is ${manager.logger(`bot_mongo_state_${mongoose.connection.readyState}`)}`)
    })
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || message.channel.type == "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ /g);
    const cmd = args.shift().toLowerCase();
    const target = message.mentions.users.first();
    const reasonarg = manager.reason(args.slice(1).join(" "));

    if (message.content.startsWith(prefix)) {
        
        if (cmd === "restart") {
            if (!Coder || !Owner) return message.channel.send(manager.logger("missing_permissions"));
            message.channel.send(manager.logger("restarting"))
                .then(message => client.destroy())
                .then(() => client.login(token) && client.emit('ready'))
                .then(async () => await message.channel.send(manager.logger("sucefully_restarted")))
        };

        if (cmd === "enable") {
            if (!message.member.permissions.has('ADMINISTRATOR')) return logs.red('Failed');
            if (!args[0]) return message.reply('Dumb Fuck');
            if (!client.commands.map(({name}) => name).includes(args[0])) return message.channel.send(manager.logger("not_valid")) && console.log('Retard');
            client.commands.get(args[0]).enable = 1;
        };

        if (!client.commands.has(cmd)) return;

        try {
            if (client.commands.get(cmd).enable == 0) return logs.red('Disabled');
            await client.commands.get(cmd).execute({message, args, target, reasonarg, client});
        } catch (err) {
            console.error(err);
            await message.reply({content: manager.logger("error_exec")})
        };
    }
});

client.on('interactionCreate', async (int) => {
    if (!int.isCommand()) return;
    if (!client.slcommands.has(int.commandName)) return;

    try {
        if (client.slcommands.get(int.commandName).enable == 0) return logs.red('Disabled')
        await client.slcommands.get(int.commandName).execute({int, client})
    } catch (err) {
        console.log(err);
        await interaction.reply({ content: manager.logger("error_exec")});
    }
});

client.login(token);