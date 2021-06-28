const Discord = require('discord.js');
const { prefix, token, Owner, Coder } = require('./config.json');
const mongo = require('./mongo');
const fs = require('fs');
const manager = require('./manager')
const colors = require('./colors');

const client = new Discord.Client({partials: ['MESSAGE', 'REACTION']});
client.commands = new Discord.Collection();
const commandsFolder = fs.readdirSync('./comandos');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const moneyFiles = fs.readdirSync('./monetary system').filter(file => file.endsWith('.js'));

for (const folder of commandsFolder) {
    const commandFiles = fs.readdirSync(`./comandos/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./comandos/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

for (const file of moneyFiles) {
    const monetary = require(`./monetary system/${file}`);
    client.on(monetary.name, (...args) => monetary.execute(...args, client));
    client.commands.set(monetary.name, monetary)
}

client.on('ready', async () => {
    let msg = colors.rainbow(`${client.user.username} iniciou em ${client.guilds.cache.size} servidore(s).`, true);
    console.log(colors.colorFG(msg, colors.BLACK));
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
    const reasonarg = manager.reason(args.slice(1).join(" "));

    if (message.content.startsWith(prefix)) {
        
        if (cmd === "restart") {
            if (!Coder || !Owner) return message.channel.send("Você não tem permissão para usar este comando");
            message.channel.send("Reiniciando...")
                .then(message => client.destroy())
                .then(() => client.login(token))
                .then(async () => await message.channel.send("`Reiniciada com sucesso!!!`"))
        }

        if (!client.commands.has(cmd)) return;

        try {
            client.commands.get(cmd).execute({message, args, target, reasonarg, client});
        } catch (err) {
            console.error(err);
            message.reply('F')
        };
    }
});

client.login(token);