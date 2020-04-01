module.exports = {
    name: 'lenny',
    description: 'Makes a lenny face',
    category: "fun",
    usage: 'lenny',
    execute(message, args) {
        if (message.deletable) {
            message.delete();
        }
        return message.reply("Creating a lenny face...")
            .then(m => m.edit("( ͡° ͜ʖ ͡°)"));
    }
};