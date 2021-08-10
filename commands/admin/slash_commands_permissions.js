module.exports= {
    name: "permissions",
    description: "Sets the permissions for the slash commands",
    enable: 1,
    async execute({message, client}) {

        const fullPermissions = [
            {
                id: "874734747371311126",
                permissions: [
                    {
                        id: "336185079850074113",
                        type: "USER",
                        permission: true,
                    }
                ]
            },
            {
                id: "874734747371311127",
                permissions: [
                    {
                        id: "336185079850074113",
                        type: "USER",
                        permission: true,
                    }
                ]
            }
        ]

        await client.guilds.cache.get('209700044763430912')?.commands.permissions.set({ fullPermissions });

        message.channel.send('**Slash Commands Permissions Updated!**');
    }
}