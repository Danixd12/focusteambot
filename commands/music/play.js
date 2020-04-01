const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();

module.exports = {
    name: 'play',
    description: 'Plays music',
    aliases: ['p'],
    category: 'music',
    usage: '/play',
    execute: async function(message, args, ops) {
        if (message.deletable) {
            message.delete();
        }
        const voiceChannel = message.member.voice.channel;
        const isURL = ytdl.validateURL(args[0]);
        if (!voiceChannel) {
            return message.reply("❌ Please connect to a voice channel first!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!args[0]) {
            return message.reply("❌ Please provide a **valid** URL!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!isURL) {
            return message.reply("❌ Please provide a **valid** URL!")
                .then(m => m.delete({timeout: 5000}));
        }

        const info = await ytdl.getInfo(args[0]);

        let data = ops.active.get(message.guild.id) || {};
        if (!data.connection) {
            data.connection = await message.member.voice.channel.join();
        }
        if (!data.queue) {
            data.queue = [];
        }
        data.guildID = message.guild.id;

        data.queue.push({
            songTitle: info.title,
            requester: message.author.username,
            url: args[0],
            announceChannel: message.channel.id
        });

        async function finish(client, ops, data) {
            let fetched = ops.active.get(data.dispatcher.guildID);
            fetched.queue.shift();
            if (fetched.queue.length > 0) {
                ops.active.set(data.dispatcher.guildID, fetched);
                await play(client, ops, fetched);
            } else {
                ops.active.delete(data.dispatcher.guildID);
                let vc = message.guilds.cache.get(data.dispatcher.guildID).me.voice.channel;
                if (vc) vc.leave();
            }
        }

        async function play(client, ops, data) {
            await message.channel.send(`Now playing: **${data.queue[0].songTitle}** || Requested by: **${data.queue[0].requester}**`);
            data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, {filter: "audioonly"}));
            data.dispatcher.guildID = data.guildID;

            data.dispatcher.once('finish', function () {
                finish(client, ops, data);
            });
        }

        if (!data.dispatcher) {
            await play(client, ops, data, message);
        } else {
            return message.channel.send(`Added to queue: **${info.title}** || Requested by: **${message.author.username}**`);
        }
        ops.active.set(message.guild.id, data);
    }
};

