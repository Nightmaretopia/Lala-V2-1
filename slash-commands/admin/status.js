// Types: Playing 🠖 0   Streaming 🠖 1   Listening 🠖 2   Watching 🠖 3    Custom 🠖 4  Competing 🠖 5

const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "status",
    descriptions: "Owner only",
    enable: 1,
    async execute({int}) {
        int.reply(int.id)
    }
}