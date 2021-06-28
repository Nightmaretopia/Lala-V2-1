module.exports = {
    name: 'hentai',
    description: 'Envia um link random do nhentai',
    execute({message}) {
        if (!message.channel.nsfw) return message.channel.send("Este canal não permite conteudo nsfw!");
        let hentai = Math.floor(Math.random() * 400000)
        message.channel.send(`${message.author}\n https://nhentai.net/g/${hentai}`)
    }
}