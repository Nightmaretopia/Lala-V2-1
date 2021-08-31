module.exports = {
    name: "msg",
    async execute({int}) {
        int.delete()
        const message = int.options.getString("message");
        const isAnonym = int.options.getBoolean("anonymous");
        const finalMessage = `${message} - ${int.member.tag}`;

        let channel = int.options.getString("channel");
        if (!channel) channel = int.channel.id
        const channelToSend = int.client.channels.cache.find(channel);

        if (!isAnonym) {
            channelToSend.send(finalMessage)
        } else {
            channelToSend.send(message)
        }
    }
}