const { getMember } = require('../../function.js');
const Discord = require('discord.js');
const color = require('../../colors.json');

module.exports = {
    name: 'gay',
    description: 'Gay r8 machine',
    category: 'fun',
    usage: '/gay (mention)',
    execute(message, args) {
        if (message.deletable) {
            message.delete();
        }
        const member = getMember(message, args.join(' '));
        const gay = Math.random() * 100;
        const gayIndex = Math.floor(gay / 10);
        if (args[0]) {
            if (!member) {
                return message.reply("❌ Please tag an user!")
                    .then(m => m.delete({timeout: 5000}));
            }
            let gEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                .setTitle("Gay Rate Machine")
                .setDescription(`${member.user.username} is ${gayIndex}% gay`)
                .setFooter(`Requested by ${member.author.username}`, member.author.displayAvatarURL())
                .setTimestamp()
            return message.channel.send(gEmbed);
        }
    }
};
