const Discord = require('discord.js');
const { getMember, formatDate } = require('../../function.js');
const color = require('../../colors.json');
const { stripIndents } = require('common-tags');

module.exports = {
  name: 'info',
  description: 'Shows info',
  category: "info",
  usage: '/info (mention)',
  execute: function(message, args) {
    if (message.deletable) {
      message.delete();
    }
    const member = getMember(message, args.join(" "));

    if (!args[0]) {
      return message.reply("❌ Please tag an user!")
          .then(m => m.delete({timeout: 5000}));
    }

    const userStatus = member.user.presence.status;

    let status;

    if (userStatus === "online") {
      status = "Online";
    } else if (userStatus === "idle") {
      status = "AFK";
    } else if (userStatus === "offline") {
      status = "Offline";
    } else if (userStatus === "dnd") {
      status = "Don't Disturb";
    }


    let iEmbed = new Discord.MessageEmbed()
        .setColor(color.cyan)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL())
        .setTitle('User Info')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Basic Information:', stripIndents`
          **- Username:** ${member.user.username}
          **- Discriminator:** ${member.user.discriminator}
          **- Status:** ${status}
          **- Account Created In:** ${formatDate(member.user.createdAt)}`, true)
        .addField('Other Information:', stripIndents`
          **- Joined Guild Since:** ${formatDate(member.joinedAt)}
          **- Role:** ${member.roles.highest}`, true)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setTimestamp()
    return message.channel.send(iEmbed);
  }
};