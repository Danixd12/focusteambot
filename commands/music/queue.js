const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'queue',
    description: 'Shows queue',
    category: 'music',
    usage: '/queue [clear]',
    execute: async function(message, args, ops, data) {
        if (message.deletable) {
            message.delete();
        }
        const fetched = ops.active.get(message.guild.id);
        if (!args[0]) {
            if (!fetched) {
                return message.reply("❌ There isn't any song playing currently!")
                    .then(m => m.delete({timeout: 5000}));
            }

            let queue = fetched.queue;
            let nowPlaying = queue[0];

            let resp = `Now playing: **${nowPlaying.songTitle}**. Requested by: **${nowPlaying.requester}**\n\n__**Up Next:(if there any)**__\n`;

            for (let i = 1; i < queue.length; i++) {
                resp += `${i}) **${queue[i].songTitle}**. Requested by: **${queue[i].requester}**\n\n`;
            }
            await message.channel.send(resp);
        } else if (args[0] === "clear") {
            ops.active.delete(message.guild.id);
            await message.reply("✔ Queue cleared!");
            return fetched.dispatcher.emit('finish');
        }


    }
};