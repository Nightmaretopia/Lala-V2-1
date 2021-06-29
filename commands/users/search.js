module.exports = {
    name: 'search',
    description: 'Procurar um doujin no nhentai',
    execute({message, args}) {
        if (!message.channel.nsfw) return message.channel.send("Este canal não permite conteudo nsfw!");
        if (!args[0]) return message.channel.send('Você não especificou o que devo procurar');
        message.channel.send(`${message.author}\nhttps://nhentai.net/g/${args[0]}`);
    }
}