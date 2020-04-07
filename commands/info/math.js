const Discord = require('discord.js');
const math = require('mathjs');
const color = require('../../colors.json');

module.exports = {
    name: 'math',
    description: 'Calculates the math',
    category: "info",
    usage: '/math (expression)',
    execute(message, args) {
        if (message.deletable) {
            message.delete();
        }

        let result = math.evaluate(`${args.slice(0).join(" ").replace(/x/,"*").replace(/:/, "/")}`);

        if (!args[0]) {
            return message.reply("❌ Please provide an expression to calculate!")
                .then(m => m.delete({timeout: 5000}));
        } else if (args[0]) {
            let mEmbed = new Discord.MessageEmbed()
                .setColor(color.azure)
                .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                .setTitle("Expression result:")
                .addField("Expression", args.slice(0).join(" "), true)
                .addField("Result", result, true)
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp()
            return message.channel.send(mEmbed);
        }
    }
};