const { logs } = require('../utils/color-manager');
const { Coder } = require('../config.json')

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        let toushiro = '826306764320407554';
        if (message.author.bot) return;
        if (message.author.id !== toushiro) return;
            message.react('854359427570466817')
    }
}