module.exports = {
    name: 'unmute',
    description: 'Mutes a user',
    category: "moderation",
    usage: '/unmute (mention) (reason)',
    execute: async function(message, args) {
        if (message.deletable) {
            message.delete();
        }
        if (!args[0]) {
            return message.reply("❌ Please provide an user to unmute!")
                .then(m => m.delete({timeout: 5000}));
        }
        if (!args[1]) {
            return message.reply("❌ Please provide a reason to unmute!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.reply("❌ You don't have permission to unmute!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.reply("❌ You don't have permission to unmute!")
                .then(m => m.delete({timeout: 5000}));
        }

        const userMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!userMute) {
            return message.reply("❌ User not found!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (userMute.id === message.author.id) {
            return message.reply("❌ You cannot unmute yourself!")
                .then(m => m.delete({timeout: 5000}));
        }

        let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");
        if (!muteRole) {
            return message.reply("❌ Cannot unmute this user because that user isn't muted!")
        }

        await userMute.roles.remove(muteRole, "Unmuted");
        await member.send(`You have been unmuted on **${message.guild.name}**`);
        return message.channel.send(`<@${userMute.id}> has been unmuted automatically!`)
    }
};