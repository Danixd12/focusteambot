const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, bot_owner } = require('./config.json');
const active = new Map();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.once('ready', async () => {
    await console.log("Signing in Discord");
    await console.log("Discord Sign in Successfully");
    await console.log("Preparing to recieve commands");
    await console.log(`${client.user.username} is ready`);
    await client.user.setActivity("All members in the server | /help", {type: "WATCHING"})
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content.startsWith(prefix)) return;

    let ops = {
        bot_owner: bot_owner,
        active: active,
    };

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command){
        command.execute(message, args, ops);
    }
});

client.login(token);