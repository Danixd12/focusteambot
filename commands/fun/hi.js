module.exports = {
    name: 'hi',
    description: 'Says hi',
    category: "fun",
    usage: '/hi',
    execute(message) {
        if (message.deletable) {
            message.delete();
        }
        message.reply("Hi. Have a good day!");
    }
};