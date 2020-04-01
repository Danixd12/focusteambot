
module.exports = {
    name: 'death',
    description: 'À thì ra mày chọn cái chết!',
    category: "fun",
    usage: '/death (mention)',
    execute(message, args) {
        if (message.deletable) {
            message.delete();
        }

        const deathUser = message.mentions.members.first();

        if (!message.mentions.members.size) {
            return message.reply("❌ Please tag an user")
                .then(m => m.delete({timeout: 5000}));
        } else {
            return message.channel.send(`${deathUser} So you have chosen...death!`);
        }
    }
};