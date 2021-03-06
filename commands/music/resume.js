module.exports = {
    name: 'resume',
    description: 'Resumes the music',
    category: 'music',
    usage: '/resume',
    execute(message, args, ops) {
        if (message.deletable) {
            message.delete();
        }
        let fetched = ops.active.get(message.guild.id);
        if (!fetched) {
            return message.reply("❌ There isn't any song playing currently!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (message.member.voice.channel !== message.guild.me.voice.channel) {
            return message.reply("❌ You aren't connected to the same voice channel!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!fetched.dispatcher.paused) {
            return message.reply("❌ The player isn't pausing!")
                .then(m => m.delete({timeout: 5000}));
        }

        fetched.dispatcher.resume();
        return message.reply("✔ Player Resumed!");
    }
};