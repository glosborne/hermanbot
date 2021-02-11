// Herman the Discord bot
// by GL Osborne
// takes the 'secret word' of the day, generated from a noun list by a daily
//      cron job, and posts an announcement whenever someone uses the word.

// Require stuff, declare stuff
const Discord = require("./node_modules/discord.js");
const fs = require('fs');
var path = require('path');
const client = new Discord.Client();
const config = require("./config.json");
var err = '';
var data = '';
var secretword = '';


// This section lifted from https://gist.github.com/eslachance
client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity('What\'s the secret word?');
});

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
    // This event will run on every single message received, from any channel or DM.

    if (message.author.bot) return;

    // And now, GL's part!

    // Get the secret word from its text file
    fs.readFile((path.join(__dirname, 'secretword.txt')), (err, data) => {
        const content = data.toString();
        secretword = content.trim().toLowerCase();

        // Convert the received message into an array of unique words
        var msgwords = message.content.trim().split(/ +/g);
        msgwords.filter((item, index) => msgwords.indexOf(item) === index);
        msgwords.reduce((unique, item) =>
            unique.includes(item) ? unique : [...unique, item], []);

        var wd = '';

        // Compare the secret word to the message array and find the secret word
        for (wd of msgwords) {
            wd = wd.toLowerCase();
            if (wd === secretword) {
                message.channel.send('AHHHHHHHHHH ' + message.author.username + ' said the secret word!!!');
                break;
            }
        }

    });
});

client.login(config.token);
