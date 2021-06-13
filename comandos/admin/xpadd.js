const Discord = require('discord.js');
const { getXP, getLvL } = require('../manager');

module.exports = {
    name: 'xpadd',
    description: 'Adiciona xp a um utilizador',
    execute(message) {
        // maybe
        message.channel.send('Desu~')
    }
}