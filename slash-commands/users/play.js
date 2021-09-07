const ytdl = require("ytdl-core");

module.exports = {
    name: "play",
    async execute({ int, queue, guildQueue }) {
        console.log(guildQueue)
        const voiceChannel = int.member.voice.channel
        if (!voiceChannel) return int.reply({ content: "You need to be in a voice channel to use this command", ephemeral: true })
        const songInfo = await ytdl.getInfo(int.options.getString("link"))
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
        }
        if (!guildQueue) {
            const queueConstruct = {
                textChannel: int.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };
            queue.set(int.guild.id, queueConstruct)
            queueConstruct.songs.push(song);
            try {
                const connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(int.guild, queueConstruct.songs[0])
            } catch (err) {
                console.log(err)
                queue.delete(int.guild.id)
                return int.reply(err)
            }
        } else {
            guildQueue.songs.push(song)
            console.log(guildQueue.songs)
            return int.reply(`${song.title} added to the queue`)
        }
        const dispatcher = guildQueue.connection
            .play(ytdl(song.url))
            .on("finish", () => {
                guildQueue.songs.shift();
                play(int.guild, guildQueue.songs[0])
            })
            .on("erro", error => console.log(error))
        dispatcher.setVolumeLogarithmic(guildQueue.volume / 5)
        int.reply(`Playing ${song.title}`)

        function play(guild, song) {
            const serverQueue = queue.get(guild.id)
            if (!song) {
                serverQueue.voiceChannel.leave()
                queue.delete(guild.id)
                return
            }
        }
    }
}