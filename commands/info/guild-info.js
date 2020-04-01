const color = require('../../colors.json');
const { formatDate } = require("../../function");
const Discord = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    name: 'guild-info',
    description: 'Displays guild info',
    category: 'info',
    usage: '/guild-info',
    execute(message, args) {
        if (message.deletable) {
            message.delete();
        }
        let bot = message.guild.members.cache
            .filter(member => member.user.bot).size;
        let human = message.guild.members.cache
            .filter(member => !member.user.bot).size;
        let srvEmbed = new Discord.MessageEmbed()
            .setColor(color.cyan)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle('Guild Info')
            .setThumbnail(message.guild.iconURL())
            .addField('Basic Information:', stripIndents`
          **- Guild Name:** ${message.guild.name}
          **- Guild Owner:** ${message.guild.owner}
          **- Guild Created Since:** ${formatDate(message.guild.createdAt)}
          **- Total Members:** ${message.guild.members.cache.size}
          **- Bots:** ${bot}
          **- Humans:** ${human}`, true)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()
        return message.channel.send(srvEmbed);
    }
};