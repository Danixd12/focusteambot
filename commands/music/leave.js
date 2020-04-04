module.exports = {
    name: 'leave',
    description: 'Leave the voice channel',
    aliases: ['l'],
    category: 'music',
    usage: '/leave',
    execute: async function(message) {
        if (message.deletable) {
            message.delete();
        }
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply("❌ Please connect to a voice channel first!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.guild.me.voice.channel) {
            return message.reply("❌ I'm not connected to a voice channel!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (message.member.voice.channel !== message.guild.me.voice.channel) {
            return message.reply("❌ You aren't connected to the same voice channel!")
                .then(m => m.delete({timeout: 5000}));
        }
        await message.reply("✔ Leaving channel...");
        return message.guild.me.voice.channel.leave();
    }
};