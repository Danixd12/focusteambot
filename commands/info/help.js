const Discord = require('discord.js');
const color = require('../../colors.json');
const { prefix } = require('../../config.json');

module.exports = {
    name: 'help',
    description: 'Gives help',
    category: 'info',
    usage: '/help',
    execute: async function(message, args) {
        const data = [];
        const { commands } = message.client;
        if (message.deletable) {
            message.delete();
        }

        commands.map(command => command.name).join(', ')


        if (!args.length) {
            let lEmbed = new Discord.MessageEmbed()
                .setColor(color.darkorange)
                .setAuthor(`${message.guild.name}`, message.guild.iconURL())
                .setTitle("Command List")
                .setDescription(`Use ${prefix}help (command) to get details about it`)
                .addField("Commands",`${commands.map(command => command.name).join(', ')}`, true)
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp()

            return message.channel.send(lEmbed);
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply("❌ Command doesn't exist");
        }

        let hEmbed = new Discord.MessageEmbed()
            .setColor(color.darkcyan)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle(`Help`)
            .setDescription(`Argument: [] - optional, () - required`)
            .setFooter(`Requested by JustAPie`, message.author.displayAvatarURL())
            .setTimestamp()

        hEmbed.addField(`Name`, command.name, true)

        if (command.aliases) {
            hEmbed.addField("Aliases:", command.aliases.join(', '), true)
        }
        if (command.category) {
            hEmbed.addField("Category:", command.category, true)
        }
        if (command.usage) {
            hEmbed.addField("Usage:", command.usage, true)
        }
        if (command.description) {
            hEmbed.addField("Description:", command.description, true)
        }
        await message.channel.send(hEmbed);
    }
};