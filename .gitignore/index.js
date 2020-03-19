// Herman the Discord bot
// by GL Osborne
// takes the 'secret word' of the day, generated from a noun list by a daily
//      cron job, and posts an announcement whenever someone uses the word.




// Require stuff, declare stuff
const Discord = require('discord.js');
const fs = require('fs');
var path = require('path');
const client = new Discord.Client();
require('dotenv').config();
var err = '';
var data = '';


// ----------------------- MAIN ---------------------------


// Log in

client.on('ready', () => {
    console.log('Bot has started!');
    client.user.setActivity('Who will say the secret word?');
});


// Watch for command

client.on('message', async message => {
    // This event will run on every single message received, from any channel or DM.

	var timeout;

    if (message.author.bot) return;

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
                message.channel.send('AHHHHHHHHHH ' + message.author + ' said the secret word!!!');
                break;
            }
        }
    });
});

client.login(process.env.BOT_TOKEN);
