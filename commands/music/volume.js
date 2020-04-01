module.exports = {
    name: 'volume',
    aliases: ['vol'],
    description: 'Adjusts the volume',
    category: 'music',
    usage: '/volume (number 0-200)',
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

        if (fetched.dispatcher.paused) {
            return message.reply("❌ The player isn't playing!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (isNaN(args[0]) || args[0] > 200 || args[0] < 0) {
            return message.reply("❌ Please input a valid number greater than 0 and lower than 200!")
                .then(m => m.delete({timeout: 5000}));
        }
        fetched.dispatcher.setVolume(args[0]/100);
        return message.reply(`✔ Successfully set the volume to: ${args[0]}%!`);
    }
};