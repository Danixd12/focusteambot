const math = require('mathjs');

module.exports = {
    name: 'skip',
    description: 'Skips a song',
    aliases: ['s', 'next'],
    usage: '/skip',
    category: 'music',
    execute(message, args, ops, data) {
        if (message.deletable) {
            message.delete();
        }

        let fetched = ops.active.get(message.guild.id);
        if (!fetched) {
            return message.reply("❌ There isn't any song playing currently!")
                .then(m => m.delete({timeout: 5000}));
        }
        const voiceChannel = message.member.voice.channel;
        if (voiceChannel !== message.guild.me.voice.channel) {
            return message.reply("❌ Please connect to a voice channel first!")
                .then(m => m.delete({timeout: 5000}));
        }

        ops.active.set(message.guild.id, fetched);
        fetched.dispatcher.emit('finish');

        return message.channel.send("✔ Skip Successfully!");


    }
};