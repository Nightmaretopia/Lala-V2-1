const { Owner } = require('../../config.json');
const { manager } = require('../../utils/manager');

module.exports = {
    name: "deploy",
    async execute({message}) {
        if (message.author != Owner) return message.reply(manager.logger("missing_permissions"));
        if (!message.client.application?.owner) await message.client.application?.fetch();

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
                    },
                    {
                        name: "reason",
                        description: "Reason to ban the user",
                        type: "STRING"
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
                    },
                    {
                        name: "reason",
                        description: "Reason to ban the user",
                        type: "STRING"
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
            },
            {
                name: "icon",
                description: "Gets the server icon",
            },
            {
                name: "emoji",
                description: "",
                options: [
                    {
                        name: "emoji",
                        description: "The emoji to get the image from",
                        type: "STRING"
                    },
                    {
                        name: "id",
                        description: "Use the id of an emoji to get his image",
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
                name: "status",
                description: "Set the bot status",
                options: [
                    {
                        name: "status",
                        description: "Choose the status for the bot",
                        type: "STRING"
                    },
                    {
                        name: "type",
                        description: "Playing 🠖 0   Streaming 🠖 1   Listening 🠖 2   Watching 🠖 3    Custom 🠖 4  Competing 🠖 5",
                        type: "STRING"
                    }
                ]
            },
            {
                name: "join",
                description: "Fakes a join",
                defaultPermission: false,
                options: [
                    {
                        name: "target",
                        description: "The user you want to use on the fake",
                        type: "USER"
                    }
                ]
            },
            {
                name: "leave",
                description: "Fakes a leave",
                defaultPermission: false,
                options: [
                    {
                        name: "target",
                        description: "The user you want to use on the fake",
                        type: "USER"
                    }
                ]
            }
        ];

        const command = await message.client.guilds.cache.get('209700044763430912')?.commands.set(data);
        console.log(command)

        message.channel.send('**Slash Commands Deployed!**');

    }
}
