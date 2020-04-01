module.exports = {
    name: 'clear',
    description: 'Clears number of messages',
    category: "moderation",
    usage: '/clear (number)',
    execute(message, args) {
        if (message.deletable) {
            message.delete();
        }
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply("❌ You don't have permissions!")
                .then(m => m.delete({timeout: 5000}));
        }
        if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
            return message.reply("❌ Please provide me permissions to do this!")
                .then(m => m.delete({timeout: 5000}));
        }
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("❌ Please provide a valid number!")
                .then(m => m.delete({timeout: 5000}));
        }
        let deleteamount;
        if (parseInt(args[0]) > 100) {
            deleteamount = 100;
        } else {
            deleteamount = parseInt(args[0])
        }
        message.channel.bulkDelete(deleteamount, true)
            .then(m => message.reply(`✔ Deleted ${m.size} messages`).then(m => m.delete({timeout: 5000})))
            .catch(err => message.reply("❌ An error occurred!"));
    }
};