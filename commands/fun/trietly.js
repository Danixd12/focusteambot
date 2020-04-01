const { getMember } = require('../../function.js');

module.exports = {
    name: 'trietly',
    description: 'Hierarchy of life',
    category: 'fun',
    usage: '/trietly (mention)',
    execute(message, args) {
        if (message.deletable) {
            message.delete();
        }

        const member = getMember(message, args.join(" "));
        if (!member) {
            return message.reply("❌ Please tag an user!")
                .then(m => m.delete({timeout: 5000}));
        }
        return message.channel.send(`${member}! Không làm mà đòi có ăn thì chỉ có ăn đầu buồi ăn cứt`);
    }
};