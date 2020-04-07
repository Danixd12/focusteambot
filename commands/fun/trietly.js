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
        if (!args[0]) {
            return message.reply("❌ Please tag an user!")
                .then(m => m.delete({timeout: 5000}));
        } else {
            const botUser = message.guild.members.cache.find(m => m.id === "686851924771078154");
            if (botUser) {
                return message.reply('Có con cặc!');
            }
        	return message.channel.send(`${member} Không làm mà đòi có ăn thì chỉ có ăn đầu buồi ăn cứt`);
        }
       
    }
};