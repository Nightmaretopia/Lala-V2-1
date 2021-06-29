const { MessageEmbed }=require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Envia o avatar da(s) pessoa(s) mencionada(s)',
    execute({message}) {
        message.delete({timeout: 30});
        
        if(message.mentions.users.size){
            let index = 0, embed = [];
            message.mentions.users.forEach(user => {
                embed[index] = new MessageEmbed()
                    .setColor("#0000FF")
                    .setTitle(`Avatar de ${user.tag}`)
                    .setURL(user.avatarURL({size: 2048, dynamic: true}))
                    .setImage(user.avatarURL({size: 2048, dynamic: true}));
                message.channel.send(embed[index]);
                index++
            })
        }else{
            const embed = new MessageEmbed()
                .setColor("#0000FF")
                .setURL(message.author.avatarURL({size: 2048, dynamic: true}))
                .setImage(message.author.avatarURL({size: 2048, dynamic: true}));
            return message.channel.send(embed)
        }
        
    }
}
