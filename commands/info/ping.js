const Discord = require('discord.js');
const color = require('../../colors.json');
const {stripIndents} = require("common-tags");
const client = new Discord.Client();

module.exports = {
    name: 'ping',
    description: 'Show ping',
    category: "info",
    usage: 'ping',
    async execute(message, args) {
        if (message.deletable) {
            message.delete();
        }
        await message.reply("Pinging...")
            .then(m => m.delete({timeout: 100}));
        let pEmbed = new Discord.MessageEmbed()
            .setColor(color.black)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .addField("Ping:", stripIndents`
            **- Latency:** ${Math.floor(message.createdTimestamp - message.createdTimestamp)}ms`, true)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()
        return message.channel.send(pEmbed);
    }
};