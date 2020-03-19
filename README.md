# Herman bot for Discord

Herman is an simple Discord bot.  It watches the server for the secret word of the day (always a noun), 
and when someone enters the word the bot responds with "AHHHHHHHHHHHH @user said the secret word!!!!"  Yes, it's goofy, 
and yes I watched Pee Wee's Playhouse as a kid.  

The secret word is changed daily.

This bot is running and is public, but I thought I'd share the code for anyone looking for an example of how to write this type of bot.


## Requirements

To run the existing public bot, you don't need anything but admin level access to a Discord server and a web browser.

To run the bot code on your system, you'll need node.js and npm, and be able to set a daily cron job if you want the secret
word to change automatically.


## Installation

### Public bot 
While logged into Discord, go to: 
https://discordapp.com/api/oauth2/authorize?client_id=688410847441322176&permissions=2048&scope=bot

Choose your server and authorize the bot.

### Running the code yourself

Please see this article for directions on how to set up a Discord bot.  It's a longish process.  
Just use this project's index.js instead of the article's.  You will need to set up your own package.json
file; follow the article's instructions.
https://thomlom.dev/create-a-discord-bot-under-15-minutes/

You'll need to create this cron job if you want the bot to automatically change the secret word every night at midnight.
(Just google 'cron job' if you don't know what they are.)

```bash
0 0 * * * shuf -n 1 PATH/nounlist.txt > PATH/secretword.txt    #PATH is the absolute path to the files
```

You can also manually change the secret word by editing secretword.txt.  Or make the word change more/less often.  Whatever you like.


## Usage

You don't have to do anything.  Herman just watches the server, and responds when the secret word is said.


## Support

[Report an issue](https://github.com/glosborne/) if you have problems.


## Notes

The file for the secret words came from http://www.desiquintans.com/nounlist and it's being updated all the time. I suggest
you download a fresh copy, but the one included in this repository will do the trick as well.


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)