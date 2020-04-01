const Discord = require('discord.js');
const color = require('../../colors.json');
const { promptMessage } = require("../../function");
const { stripIndents } = require("common-tags");
const ms = require('ms');

module.exports = {
    name: 'tempmute',
    description: 'Mutes a user',
    category: "moderation",
    usage: '/tempmute (mention) (time) (reason)',
    execute: async function(message, args) {
        if (message.deletable) {
            message.delete();
        }
        if (!args[0]) {
            return message.reply("❌ Please provide an user to mute!")
                .then(m => m.delete({timeout: 5000}));
        }
        if (!args[1]) {
            return message.reply("❌ Please provide a time to mute!")
                .then(m => m.delete({timeout: 5000}));
        }


        if (!args[2]) {
            return message.reply("❌ Please provide a reason to mute!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.reply("❌ You don't have permission to mute!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.reply("❌ You don't have permission to mute!")
                .then(m => m.delete({timeout: 5000}));
        }

        const userMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");

        if (!userMute) {
            return message.reply("❌ User not found!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (userMute.id === message.author.id) {
            return message.reply("❌ You cannot mute yourself!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!muteRole) {
            muteRole = await message.guild.roles.create({data: {
                    name: "Muted",
                    color: "DEFAULT",
                    permissions: []
                }, reason: "Muted"});
        }
        message.guild.channels.cache.forEach(c => c.overwritePermissions([
            {
                id: muteRole.id,
                deny: ["SEND_MESSAGES", "CONNECT", "SEND_TTS_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "ADD_REACTIONS"],
            }
        ]));


        let mEmbed = new Discord.MessageEmbed()
            .setColor(color.red)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle('An user has been muted')
            .setThumbnail(userMute.user.displayAvatarURL())
            .addField("Muted User's info", stripIndents`
            **- Username:** ${userMute.user.username}
            **- Banned by:** ${message.author.username}
            **- Reason:** ${args.slice(2).join(" ")}
            **- Mute expires in:** ${args[1]}`, true)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()

        let pEmbed = new Discord.MessageEmbed()
            .setColor(color.yellow)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle('Are you sure about that? (Invalid in 10s)')
            .setThumbnail(userMute.user.displayAvatarURL())
            .addField("User will be muted:", stripIndents`
            **- Username:** ${userMute.user.username}
            **- Discriminator:** ${userMute.user.discriminator}`, true)
            .addField("Available options", stripIndents`
            **- Confirm:** ✔
            **- Abort:** ❌`, true)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()

        await message.channel.send(pEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 10,["❌", "✔"]);
            let muteTime = args[1];
            if (emoji === "✔") {
                await userMute.roles.add(muteRole, "Muted");
                setTimeout(function () {
                    userMute.roles.remove(muteRole, "Unmuted");
                    message.channel.send(`<@${userMute.id}> has been unmuted automatically!`)
                }, ms(muteTime));
                return message.channel.send(mEmbed);
            }
            if (emoji === "❌") {
                return  message.reply("Mute cancelled!")
                    .then(m => m.delete({timeout: 5000}));
            }
        });
    }
};