module.exports = {
    name: 'invite',
    description: 'Creates an instant invite',
    category: 'misc',
    usage: '/invite',
    async execute(message) {
        if (message.deletable) {
            message.delete();
        }

        if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) {
            return message.reply("❌ You don't have permission to do this!")
                .then(m => m.delete({timeout: 5000}));
        }
        if (!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) {
            return message.reply("❌ You don't have permission to mute!")
                .then(m => m.delete({timeout: 5000}));
        }
        let invite = await message.channel.createInvite({temporary: true, reason: "Generate"});
        let inviteURL = invite.url;
        await message.reply(`Here is your invite to this guild\n${inviteURL}\nExpires in: 24 hours`);
    }
};