const color = require('../../colors.json');
const Discord = require('discord.js');

module.exports = {
    name: 'ccdb',
    description: "Có cái đb",
    category: "fun",
    usage: '/ccdb',
    execute(message, args) {
        if (message.deletable) {
            message.delete();
        }
        let cEmbed = new Discord.MessageEmbed()
            .setColor(color.aqua)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .attachFiles("./attachment/2Q.png")
            .setImage("attachment://2Q.png")
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(cEmbed);
    }
};