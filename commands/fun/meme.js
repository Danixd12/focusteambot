const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const color = require('../../colors.json');

module.exports = {
    name: 'meme',
    description: 'Generates a meme',
    category: "fun",
    usage: 'meme',
    async execute(message, args) {
        if (message.deletable) {
            message.delete();
        }
        await message.reply("Generating a meme...")
            .then(m => m.delete({timeout: 5000}));
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);
        let mEmbed = new Discord.MessageEmbed()
            .setColor(color.red)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL())
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
            .setImage(img)
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
            .setTimestamp()
        await message.channel.send(mEmbed);
    }
}