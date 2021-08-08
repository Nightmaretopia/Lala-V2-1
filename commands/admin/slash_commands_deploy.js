const { Coder } = require('../../config.json')

module.exports = {
    name: "deploy",
    async execute({message, client}) {
        if (message.author != Coder)
        if (!client.application?.owner) await client.application?.fetch();

        const data = [
            {
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
                                type: "STRING",
                                required: true
                            }
                        ]
                    }             
                ]
            },
            {
                name: "ban",
                description: "Bans the mentioned user",
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
                            },   
                            {
                                name: "reason",
                                description: "Reason to ban the user",
                                type: "STRING"
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
                                type: "STRING",
                                required: true
                            },    
                            {
                                name: "reason",
                                description: "Reason to ban the user",
                                type: "STRING"
                            }
                        ]
                    }             
                ]
            },
            {
                name: "unban",
                description: "Unbans the user",
                options: [
                    {
                        name: "id",
                        description: "Insert the ID here",
                        type: "STRING",
                        required: true
                    }
                ]
            },
            {
                name: "mute",
                description: "Mutes the user",
                options: [
                    {
                        name: "target",
                        description: "Mention the user to mute",
                        type: "USER",
                        required: true
                    }
                ]
            },
            {
                name: "tempmute",
                description: "Temporarly mutes a user",
                options: [
                    {
                        name: "target",
                        description: "Mention the user to temporarly mute",
                        type: "USER",
                        required: true
                    },
                    {
                        name: "time",
                        description: "Time that the user will be muted (in seconds)",
                        type: "STRING",
                        required: true
                    }
                ]
            },
            {
                name: "avatar",
                description: "Envia o avatar da(s) pessoa(s) mencionada(s)",
                options: [
                    {
                        name: "target",
                        description: "User to get the avatar",
                        type: "USER",
                        required: false
                    },
                    {
                        name: "target2",
                        description: "User to get the avatar",
                        type: "USER",
                        required: false
                    },
                    {
                        name: "target3",
                        description: "User to get the avatar",
                        type: "USER",
                        required: false
                    }
                ]
            }
        ];

        /*const command = */await client.guilds.cache.get('209700044763430912')?.commands.set(data);
        //console.log(command)

        message.channel.send('**Slash Commands Deployed!**');

    }
}