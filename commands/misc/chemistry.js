const chemicaltools = require('chemicaltools');
const Discord = require('discord.js');
const color = require('../../colors.json');
const { stripIndents } = require('common-tags');

module.exports = {
    name: 'element',
    description: 'Searches for chemistry elements',
    aliases: ['ele'],
    category: 'misc',
    usage: '/chemistry (element name)',
    execute(message, args) {
        if (message.deletable) {
            message.delete();
        }

        let input = args.slice(0).join(" ");
        if (!args[0]) {
            return message.reply("❌ Please input a element symbol")
                .then(m => m.delete({timeout: 5000}));
        }
        let output = chemicaltools.searchElement(input);
        let cEmbed = new Discord.MessageEmbed()
            .setColor(color.green)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle("Element infomation")
            .setThumbnail(output.url)
            .setDescription(stripIndents`
                **- Element name (by IUPAC standard):** ${output.iupac}
                **- Element Mass:** ${output.mass}
                **- Element Symbol:** ${output.symbol}`)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(cEmbed);
    }
};