const Discord = require('discord.js');
const { prefix, token, Owner, Coder } = require('./config.json');
const mongo = require('./mongo');
const fs = require('fs');
const manager = require('./utils/manager')
const { logs, colors } = require('./utils/color-manager');

const client = new Discord.Client({intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING', 'GUILDS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS', 'GUILD_INVITES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES', 'GUILD_WEBHOOKS'], partials: ['USER', 'REACTION', 'MESSAGE', 'GUILD_MEMBER', 'CHANNEL']});
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slcommands = new Discord.Collection();
const commandsFolder = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(f => f.endsWith('.js'));
const slcommandsFolder = fs.readdirSync('./slash-commands').filter(f => f.endsWith('.js'))
//const moneyFiles = fs.readdirSync('./monetary system').filter(file => file.endsWith('.js'));

for (const folder of commandsFolder) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
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
    const slCommandsFiles = fs.readdirSync(`./slash-commands/${folder}`).filter(f => f.endsWith('.js'));
    for (const file of slCommandsFiles) {
        const slCommand = require(`./slash-commands/${folder}/${file}`);
        client.slcommands.set(slCommand.name, slCommand);
    }
};

/*for (const file of moneyFiles) {
    const monetary = require(`./monetary system/${file}`);
    client.on(monetary.name, (...args) => monetary.execute(...args, client));
    client.commands.set(monetary.name, monetary)
}*/

const lang = require('./utils/langs/EN')

client.on('ready', async () => {

    console.log(lang(client, "bot_start"))

    logs.fire(`${client.user.username} iniciou em ${client.guilds.cache.size} servidore(s).`);
    client.user.setActivity("To Love-Ru", {type: "WATCHING"});

    await mongo().then((mongoose) => {
        try {
            logs.ice(`${client.user.username} Connected to MONGODB`)
        } finally {
            mongoose.connection.close();
        }
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
            if (!Coder || !Owner) return message.channel.send("Você não tem permissão para usar este comando");
            message.channel.send("Reiniciando...")
                .then(message => client.destroy())
                .then(() => client.login(token))
                .then(async () => await message.channel.send("`Reiniciada com sucesso!!!`"))
        };

        if (cmd === "enable") {
            if (!message.member.permissions.has('ADMINISTRATOR')) return logs.red('Failed');
            if (!args[0]) return message.reply('Dumb Fuck');
            if (!client.commands.map(({name}) => name).includes(args[0])) return message.channel.send(`\`${args[0]}\` não é um comando válido`) && console.log('Retard');
            client.commands.get(args[0]).enable = 1;
        };

        if (cmd === "disable") {
            /*
            Gets the value of the `enable` in the command/event and sets it to 0
            Maybe I could do a switch... TODO"
            
            if (!message.member.permissions.has('ADMINISTRATOR')) return logs.red('Failed');
            if (!args[0]) return message.reply('Dumb Fuck');
            if (!client.commands.map(({name}) => name).includes(args[0])) return message.channel.send(`\`${args[0]}\` não é um comando válido`) && console.log('Retard');
            client.commands.get(args[0]).enable = 0;
            */
        }

        if (!client.commands.has(cmd)) return;

        try {
            if (client.commands.get(cmd).enable == 0) return logs.red('Disabled');
            client.commands.get(cmd).execute({message, args, target, reasonarg, client});
        } catch (err) {
            console.error(err);
            message.reply('F')
        };
    }
});

/*
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    //if (!client.slcommands.has('doubt')) return;
});
*/

client.login(token);