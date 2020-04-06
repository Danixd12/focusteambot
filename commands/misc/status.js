const status = require('minecraft-server-util');
const Discord = require('discord.js');
const color = require('../../colors.json');
const { stripIndents } = require('common-tags');

module.exports = {
    name: 'status',
    description: 'Shows status about a Minecraft server',
    category: 'misc',
    usage: '/status (ip/domain) [port]',
    execute(message, args) {
        if (message.deletable) {
            message.delete();
        }
        if (!args[0]) {
            return message.reply("❌ Please provide a server ip!")
                .then(m => m.delete({timeout: 5000}));
        }

        if (!args[1]) {
            return message.reply("❌ Please provide a valid port number (default port: 25565)")
                .then(m => m.delete({timeout: 5000}));
        }

        if (isNaN(args[1]) || args[1] < 1 || args[1] > 65535) {
            return message.reply("❌ Please provide a valid port number (default port: 25565)")
                .then(m => m.delete({timeout: 5000}));
        }

        status(args[0], parseInt(args[1]), function (err, res) {
            if (err) message.reply("❌ The server is offline or unreachable! Please check your IP and port")
                .then(m => m.delete({timeout: 5000}));
            let sEmbed = new Discord.MessageEmbed()
                .setColor(color.green)
                .setTitle("Server info")
                .setDescription("Status: Online")
                .addField("Server Infomations:", stripIndents`
                **- Server IP**: ${res.host}
                **- Server Port:** ${res.port}
                **- Server Version:** ${res.version}
                **- Player Online:** ${res.onlinePlayers}/${res.maxPlayers}
                **- MOTD:** ${res.descriptionText}`, true)
                .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
                .setTimestamp();
            message.channel.send(sEmbed);

        });
    }
};