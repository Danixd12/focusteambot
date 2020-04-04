const Discord = require('discord.js');
const color = require('../../colors.json');
const { promptMessage } = require('../../function.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: 'disconnect',
    description: 'Disconnects an user from a voice channel',
    aliases: ['dis'],
    category: 'moderation',
    usage: '/disconnect (user) (reason)',
    execute: async function(message, args) {
        if (message.deletable) {
            message.delete();
        }

        if (!args[0]) {
            return message.reply("❌ Please tag an user!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!args[1]) {
            return message.reply("❌ Please provide a reason")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.member.hasPermission('MOVE_MEMBERS')) {
            return message.reply("❌ You don't have permission")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.guild.me.hasPermission('MOVE_MEMBERS')) {
            return message.reply("❌ Please give me permissions to do this!")
                .then(m => m.delete({timeout: 5000}));
        }

        const userDisconnect = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!userDisconnect) {
            return message.reply("❌ User not found!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!userDisconnect.voice.channel) {
            return message.reply("❌ User isn't in a voice channel!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (userDisconnect.id === message.author.id) {
            return message.reply("❌ You cannot ban yourself!")
                .then(m => m.delete({timeout: 5000}));
        }

        let dEmbed = new Discord.MessageEmbed()
            .setColor(color.red)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle("An user has been disconnected")
            .addField("Disconnected User's info", stripIndents`
            **- Username:** ${userDisconnect.user.username}
            **- Banned by:** ${message.author.username}
            **- Reason:** ${args.slice(1).join(" ")}`, true)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()

        let pEmbed = new Discord.MessageEmbed()
            .setColor(color.yellow)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle('Are you sure about that? (Invalid in 10s)')
            .setThumbnail(userDisconnect.user.displayAvatarURL())
            .addField("User will be Disconnected:", stripIndents`
            **- Username:** ${userDisconnect.user.username}
            **- Discriminator:** ${userDisconnect.user.discriminator}`, true)
            .addField("Available options", stripIndents`
            **- Confirm:** ✔
            **- Abort:** ❌`, true)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()

        await message.channel.send(pEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 10, ["✔", "❌"]);
            if (emoji === "✔") {
                await userDisconnect.voice.kick();
                return message.channel.send(dEmbed);
            } else if (emoji === "❌") {
                return  message.reply("Disconnection cancelled")
                    .then(m => m.delete({timeout: 5000}));
            }
        });
    }
};