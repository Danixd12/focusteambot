const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { promptMessage } = require('../../function.js');
const color = require('../../colors.json');

module.exports = {
    name: 'kick',
    description: 'Kicks a user',
    category: "moderation",
    usage: '/kick (mention) (reason)',
    execute: async function (message, args) {

        if (message.deletable) {
            message.delete();
        }


        if (!args[0]) {
            return message.reply("❌ Please tag an user!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!args[1]) {
            return message.reply("❌ Please provide a reason!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply("❌ You don't have permissions!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.guild.me.hasPermission('KICK_MEMBERS')) {
            return message.reply("❌ Please give me permissions to do this!")
                .then(m => m.delete({timeout: 5000}));
        }

        const userKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!userKick) {
            return message.reply("❌ User not found!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (userKick.id === message.author.id) {
            return message.reply("❌ You cannot kick yourself!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!userKick.kickable) {
            return message.reply("❌ This user cannot be kicked!")
                .then(m => m.delete({timeout: 5000}));
        }

        let kEmbed = new Discord.MessageEmbed()
            .setColor(color.red)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle('An user has been kicked')
            .setThumbnail(userKick.user.displayAvatarURL())
            .addField("Kicked User's info", stripIndents`
            **- Username:** ${userKick.user.username}
            **- Kicked by:** ${message.author.username}
            **- Reason:** ${args.slice(1).join(" ")}`, true)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()

        let pEmbed = new Discord.MessageEmbed()
            .setColor(color.yellow)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle('Are you sure about that? (Invalid in 10s)')
            .setThumbnail(userKick.user.displayAvatarURL())
            .addField("User will be kicked:", stripIndents`
            **- Username:** ${userKick.user.username}
            **- Discriminator:** ${userKick.user.discriminator}`, true)
            .addField("Available options", stripIndents`
            **- Confirm:** ✔
            **- Abort:** ❌`, true)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()

        await message.channel.send(pEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 10, ["✔", "❌"]);
            if (emoji === "✔") {
                await userKick.kick(args.slice(1).join(" "));
                return message.channel.send(kEmbed);
            } else if (emoji === "❌") {
                return message.reply("Kick cancelled")
                    .then(m => m.delete({timeout: 5000}));
            }
        });

    }
};