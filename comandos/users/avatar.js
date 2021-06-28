const {MessageEmbed}=require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Envia o avatar da(s) pessoa(s) mencionada(s)',
    execute(message) {
        message.delete({timeout: 30});
        
        if(message.mentions.users.size){
            let index=0, embed=[];
            message.mentions.users.forEach(user=>{
                embed[index]=new MessageEmbed()
                .setColor("COR")
                .setTitle(`Avatar de ${member.displayName}`)
                .setURL(user.avatarURL({format: "webp", dynamic: true, size: 1024}))
                .setImage(user.avatarURL({format: "webp", dynamic: true, size: 512}));
                message.channel.send(embed[index]);
                index++
            })
        }else{
            const embed=new MessageEmbed()
            .setColor("COR")
            .setURL(message.author.avatarURL({format: "webp", dynamic: true, size: 1024}))
            .setImage(message.author.avatarURL({format: "webp", dynamic: true, size: 512}));
            return message.channel.send(embed)
        }
        
    }
}
