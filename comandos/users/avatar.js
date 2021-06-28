const {MessageEmbed}=require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Envia o avatar da(s) pessoa(s) mencionada(s)',
    execute(message) {
        message.delete({timeout: 30});
        
        if(message.mentions.users.size){
            let index=0, embed=[];
            message.mentions.users.forEach(user=>{
                let member=message.guild.member(user);
    
                embed[index]=new MessageEmbed()
                .setColor(member.displayHexColor)
                .setTitle(`Avatar de ${member.displayName}`)
                .setURL(user.avatarURL({format: "webp", dynamic: true, size: 1024}))
                .setImage(user.avatarURL({format: "webp", dynamic: true, size: 512}))
                .setTimestamp()
                .setFooter(`Há pedido de ${message.member.displayName}`, `${message.author.avatarURL({format: "webp", dynamic: false, size: 32})}`);
                message.channel.send(embed[index]);
                index++
            })
        }else{
            let member=message.guild.member(message.author);
    
            const embed=new MessageEmbed()
            .setColor(member.displayHexColor)
            .setTitle(`Avatar de ${member.displayName}`)
            .setURL(message.author.avatarURL({format: "webp", dynamic: true, size: 1024}))
            .setImage(message.author.avatarURL({format: "webp", dynamic: true, size: 512}))
            .setTimestamp()
            .setFooter(`Há pedido de ${message.member.displayName}`, `${message.author.avatarURL({format: "webp", dynamic: false, size: 32})}`);
            return message.channel.send(embed)
        }
        
    }
}
