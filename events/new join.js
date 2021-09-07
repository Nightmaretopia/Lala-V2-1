const Discord = require('discord.js');;
const Canvas = require('canvas');
const moment = require('moment');

module.exports = {
    event: 'guildMemberAdd',
    name: 'Join 2.0',
    enable: false,
    async execute(member, client) {

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('./Welcome.png');
        const ifLogo = await Canvas.loadImage('./if.png')
        let x = 0;
        let y = 0;
        let radius = 20;

        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + canvas.width - radius, y);
        ctx.quadraticCurveTo(x + canvas.width, y, x + canvas.width, y + radius);
        ctx.lineTo(x + canvas.width, y + canvas.height - radius);
        ctx.quadraticCurveTo(x + canvas.width, y + canvas.height, x + canvas.width - radius, y + canvas.height);
        ctx.lineTo(x + radius, y + canvas.height);
        ctx.quadraticCurveTo(x, y + canvas.height, x, y + canvas.height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(background, x, y);
        ctx.drawImage(ifLogo, 17, 15, 84.25, 43.5)

        const pfp = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));

        //rgba(255, 255, 255, 0.5)
        ctx.fillStyle = '#ffffff';
        ctx.font = '35px cooper black';
        let text = `Bem-vindo ${member.user.tag}`
        x = canvas.width / 2 - ctx.measureText(text).width / 2;
        y = 70;
        ctx.fillText(text, x, y + pfp.height);

        ctx.font = '25px cooper black';
        text = `Membro #${member.guild.memberCount}`;
        x = canvas.width / 2 - ctx.measureText(text).width / 2;
        y = 100;
        ctx.fillText(text, x, y + pfp.height);

        x = canvas.width / 2 - pfp.width / 2;
        y = 30;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, y * Math.PI, pfp.width / 2, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(215, 0, 190, 1)';
        ctx.lineWidth = 9;
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(pfp, x, y);

        const att = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png');

        client.channels.cache.get('850841107050921984').send({ content: " ", files: [att] });
    }
}