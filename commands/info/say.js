const Discord = require('discord.js');
const color = require('../../colors.json');
const { bot_owner } = require('../../config.json');

module.exports = {
    name: 'say',
    description: 'Says a message',
    category: "info",
    usage: '/say [embed] (message)',
    execute(message, args) {
        if (message.deletable) {
            message.delete();
        }
        if (!args.length) {
            return message.reply("Nothing to say?")
                .then(m => m.delete({timeout: 5000}));
        }
        if (args[0] === "embed") {
            let sEmbed = new Discord.MessageEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(color.cyan);

            return message.channel.send(sEmbed);
        } else {
            return message.channel.send(args.join(" "));
        }
    }
};