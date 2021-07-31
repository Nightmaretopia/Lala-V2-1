const Discord = require('discord.js');
const money = require('./money manger');

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        /*
            need to save every use on the db and delete it per month/save in a different form
            when the month swaps, save the values in a history db and use the default value (0)

            a = coin base (1) [1 base coin = 0.50$]
            b = a * 10
            i = uses per month (get the value from the db)
            if (i >= 25) {
                var val = a * 0.05
                a = val
            } else if (i < 24) {
                a = base
            }
        */
       //console.log(money.coinVal())
    }
}