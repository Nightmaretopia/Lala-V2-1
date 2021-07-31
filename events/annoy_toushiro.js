const { logs } = require('../utils/color-manager');
const { Coder } = require('../config.json')

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        //let toushiro = '';
        if (message.author.bot) return;
        if (message.author.id !== Coder) {
            return logs.red('rip');
        } else {
        message.reply('1')
        }
    }
}