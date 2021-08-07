const { Coder } = require('../../config.json')

module.exports = {
    name: "deploy",
    async execute({message, client}) {
        if (message.author != Coder)
        if (!client.application?.owner) await client.application?.fetch();

        const kick = {
            name: "kick",
            description: "Kicks the mentioned user",
            options: [
                {  
                    name: "target",
                    description: "Mention the user you want to kick",
                    type: "SUB_COMMAND",
                    options: [
                        {
                        name: "mention",
                        description: "Mention the user you want to kick",
                        type: "USER",
                        required: true
                        }
                    ]
                },
                {
                    name: "id",
                    description: "Send the id of the user you want to kick",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "id",
                            description: "Insert the ID here",
                            type: "NUMBER",
                            required: true
                        }
                    ]
                }             
            ]
        }

        const ban = {
            name: "ban",
            description: "bans the mentioned user",
            options: [
                {  
                    name: "target",
                    description: "Mention the user you want to ban",
                    type: "SUB_COMMAND",
                    options: [
                        {
                        name: "mention",
                        description: "Mention the user you want to ban",
                        type: "USER",
                        required: true
                        }
                    ]
                },
                {
                    name: "id",
                    description: "Send the id of the user you want to ban",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "id",
                            description: "Insert the ID here",
                            type: "NUMBER",
                            required: true
                        }
                    ]
                }             
            ]
        }

        const unban = {
            name: "unban",
            description: "Unbans the user",
            options: [
                {
                    name: "id",
                    description: "Insert the ID here",
                    type: "NUMBER",
                    required: true
                }
            ]
        }

        /*const command = */await client.guilds.cache.get('209700044763430912')?.commands.create(kick && ban && unban);
        //console.log(command)

        message.channel.send('**Slash Commands Deployed!**')

    }
}