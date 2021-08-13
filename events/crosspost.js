module.exports = {
    name: "Crosspost",
    event: "messageCreate",
    enable: 1,
    async execute(message) {
        if (!message.channel.type === "news") return;
        if (!message.crosspostable) return;
        message.crosspost()
    }
}