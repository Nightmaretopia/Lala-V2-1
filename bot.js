const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const mongo = require('./mongo');
const fs = require('fs');

const client = new Discord.Client({partials: ['MESSAGE', 'REACTION']});
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.name, command);
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

client.on('ready', async () => {
    console.log("\x1b[35m\x1b[1m", `${client.user.username} iniciou em ${client.guilds.cache.size} servidore(s).`, "\x1b[0m");
    client.user.setActivity("To Love-Ru", {type: "WATCHING"});

    await mongo().then((mongoose) => {
        try {
            console.log("\x1b[32m", `${client.user.username} Connected to MONGODB`, "\x1b[0m");
        } finally {
            mongoose.connection.close();
        }
    })
});

client.on('message', async (message) => {
    if (message.author.bot || message.channel.type == "dm") return;
    const args = message.content.slice(prefix.length).trim().split(/ /g);
    const cmd = args.shift().toLowerCase();
    const target = message.mentions.users.first();
    let reason = args.slice(1).join(" ")
    if (!reason){
        reason = "Unknown"
    }else{
        reason = args.slice(1).join(" ")
    };

    if (message.content.startsWith(prefix)) {
        
        if (!client.commands.has(cmd)) return;

        try {
            client.commands.get(cmd).execute(message, args, target, client);
        } catch (err) {
            console.error(err);
            message.reply('F')
        };
    }
});

client.login(token);