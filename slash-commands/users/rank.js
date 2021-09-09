const Discord = require('discord.js');;
const Canvas = require('canvas');
const { pfManager } = require('../../utils/manager')

module.exports = {
    name: 'rank',
    description: "New rank viewer",
    enable: 1,
    async execute({int}) {

        const canvas = Canvas.createCanvas(700, 200);
        const ctx = canvas.getContext('2d');
        const xp = pfManager.getxp(int.member)
        const lvl = pfManager.getlvl(int.member)

        let x = 0;
        let y = 0;
        let fix = 2;

        const background = await Canvas.loadImage('./original.png')
        ctx.drawImage(background, x, y)
        // ctx.fillStyle = 'rgba(60, 140, 250, 0.5)';
        // ctx.rect(0, 0, canvas.width, canvas.height);
        // ctx.fill();
        // ctx.lineWidth = 3;
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(x + fix, y + fix, canvas.width - fix * 2, canvas.height - fix * 2);

        const percent = Math.round(Math.floor(1 * 100)); //TODO: Get the user xp and convert to percentage (0~100)

        // TODO: Get the box for the max lvl with the respective xp quantity above

        for(let i = 0; i < percent; i++)  {
            ctx.beginPath()
            ctx.lineWidth = 3
            ctx.strokeStyle = 'rgba(0, 0, 0, 1)'
            ctx.fillStyle = 'blue'
            let num = 4
            x = 210 + (i * num) // Total = 110 + 100 * num / 2// this.case = 510
            y = canvas.height / 2 + 35
            let r = 10 //circle radius
            ctx.arc(x, y, r, 0, Math.PI * 2, true)
            // ctx.stroke()
            ctx.fill()
            ctx.closePath()
        }

        const att = new Discord.MessageAttachment(canvas.toBuffer(), 'rank.png');

        int.reply({ content: " ", files: [att] });
    }
}