module.exports = {
    name: 'search'
    description: 'Procurar um doujin no nhentai'
    execute(message) {
         if (!message.channel.nsfw) return message.channel.send("Este canal não permite conteudo nsfw!");
            let search = 
         message.channel.execute '\n https://nhentai.net/g/${numeros}'
    }
}