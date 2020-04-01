module.exports = {
    name: 'join',
    description: 'Joins a voice channel',
    category: 'music',
    usage: '/join',
    execute(message, args) {
        if (message.deletable) {
            message.delete();
        }
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply("❌ Please connect to a voice channel first!")
                .then(m => m.delete({timeout: 5000}));
        }
        voiceChannel.join();
        return message.reply("✔ Joining your voice channel!");
    }
};