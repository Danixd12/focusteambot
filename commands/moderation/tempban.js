const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { promptMessage } = require('../../function.js');
const color = require('../../colors.json');
const ms = require('ms');
const { getMember } = require('../../function.js');

module.exports = {
    name: 'tempban',
    description: 'Bans a user',
    category: "moderation",
    usage: '/tempban (mention) (time) (reason)',
    execute: async function (message, args) {

        if (message.deletable) {
            message.delete();
        }

        const member = getMember(message, args.join(" "));

        if (!args[0]) {
            return message.reply("❌ Please tag an user!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!args[1]) {
            return message.reply("❌ Please provide a time")
                .then(m => m.delete({timeout: 5000}));
        }
        if (!args[2]) {
            return message.reply("❌ Please provide a reason")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply("❌ You don't have permission")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
            return message.reply("❌ Please give me permissions to do this!")
                .then(m => m.delete({timeout: 5000}));
        }

        const usertBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!usertBan) {
            return message.reply("❌ User not found!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (userttBan.id === message.author.id) {
            return message.reply("❌ You cannot ban yourself!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!usertBan.bannable) {
            return message.reply("❌ This user cannot be banned!")
                .then(m => m.delete({timeout: 5000}));
        }

        let bEmbed = new Discord.MessageEmbed()
            .setColor(color.red)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle('An user has been banned')
            .setThumbnail(usertBan.user.displayAvatarURL())
            .addField("Banned User's info", stripIndents`
            **- Username:** ${usertBan.user.username}
            **- Banned by:** ${message.author.username}
            **- Reason:** ${args.slice(2).join(" ")}
            **- Ban expires in:** ${args[1]}`, true)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()

        let pEmbed = new Discord.MessageEmbed()
            .setColor(color.yellow)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle('Are you sure about that? (Invalid in 10s)')
            .setThumbnail(usertBan.user.displayAvatarURL())
            .addField("User will be banned:", stripIndents`
            **- Username:** ${usertBan.user.username}
            **- Discriminator:** ${usertBan.user.discriminator}`, true)
            .addField("Available options", stripIndents`
            **- Confirm:** ✔
            **- Abort:** ❌`, true)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()

        await message.channel.send(pEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 10, ["✔", "❌"]);
            if (emoji === "✔") {
                await userBan.ban(args.slice(2).join(" "));
                await member.send(`You have been banned temporary on **${message.guild.name}** because of ${args.slice(1).join(" ")}. Ban expires in: ${args[1]}`);
                setTimeout(function(){
                    message.guild.members.unban(usertBan.id);
                    message.channel.send(`<@${usertBan.id}> has been unbanned automatically!`)
                    member.send(`You have been unbanned on **${message.guild.name}**`);
                }, ms(args[1]));

                return message.channel.send(bEmbed);
            } else if (emoji === "❌") {
                return  message.reply("Ban cancelled")
                    .then(m => m.delete({timeout: 5000}));
            }
        });

    }
};