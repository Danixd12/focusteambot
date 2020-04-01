const Discord = require('discord.js');
const { stripIndents } = require('common-tags');
const { promptMessage } = require('../../function.js');
const color = require('../../colors.json');

module.exports = {
    name: 'unban',
    description: 'Unbans a user',
    category: "moderation",
    usage: '/unban (user id) (reason)',
    execute: async function (message, args) {

        if (message.deletable) {
            message.delete();
        }

        if (!args[0]) {
            return message.reply("❌ Please provide a user to unban")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!args[1]) {
            return message.reply("❌ Please provide a reason to unban")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply("❌ You don't have permission to mute!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.guild.me.hasPermission('BAN_MEMBERS')) {
            return message.reply("❌ You don't have permission to mute!")
                .then(m => m.delete({timeout: 5000}));
        }

        const useruBan = args[0];

        await message.guild.members.unban(useruBan);
        return message.channel.send(`<@${useruBan}> has been unbanned automatically. Reason: **${args.slice(1).join(" ")}**`);

    }
};