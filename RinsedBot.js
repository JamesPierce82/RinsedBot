/*
  A bot for the MAD Club Discord. Written in Discord.js
*/

/* Variables */
// Import the discord.js module
const Discord = require('discord.js');
// Create an instance of a Discord client
const client = new Discord.Client();

// Import all settings from the conf.js file
var settings = require('./conf.js');

// Declare variables from the conf.js file
var tokenn = settings.tokenn;
var mainChannelID = settings.mainChannelID;
var debugChannelID = settings.debugChannelID;

// The token of your bot - https://discordapp.com/developers/applications/me
const token = tokenn;


var messageCount = 0;
var restartCount = Math.floor(Math.random() * 25) + 5; // Sets a minimum of 5, maximum of 30


/* Events */
// This will run when the bot is connected and ready
client.on('ready', () => {
    console.log('Connected!');
    console.log("\nLogged in as: ");
	console.log(client.user.username + " - (" + client.user.id + ")");
    
    // Notify users on server of Bot Connect
    // Find the testing server
//    var debugGuild = client.guilds.find('name', 'MAD Club');
    var debugGuild = client.guilds.find('name', 'Bot-Testing');
    // Find the debug channel
    var debugChannel = debugGuild.channels.find('name', 'bot-testing');
    debugChannel.send("Just got back from a Slurp!");
    
    console.log("messages until next JarrodNoise: " + restartCount);
    
    
    // Output all servers(guilds) that the bot is currently in
    client.guilds.forEach( function(guild) {
        console.log("\nName: " + guild.name);
        console.log("ID: " + guild.id);
        console.log("Members: " + guild.memberCount);
    });
    
    
});


// Respond to messages with various logic
client.on('message', message => {
    
    // Log all messages
    console.log("\n" + message.author.username);
    console.log("in #" + message.channel.name);
    console.log("'" + message.content + "'");
    console.log("----------");
    
    
    /* Command Message Logic */
    
    if(message.content.toLowerCase().startsWith("!execs")) {
        message.channel.send("President - James Pierce\nVice-President - Adam Bazzi\nSecretary - Kari Gignac\nTreasurer - Chris Dias");
    } else if(message.content.toLowerCase().startsWith("!help")) {
        message.channel.send("Here is a list of the available commands  :\n\n" + 
                     "**!schedule#** or **!s#** will display that years schedule (replace # with the number).\n\n" + 
                     "**!schedules** or **!ss** will display all three schedules.\n\n" +
                     "**!execs** will display the list of club executives.\n\n" + 
                     "**!help** will display this list of available commands.");
    } else if(message.content.toLowerCase().startsWith("!schedule1") || message.content.toLowerCase().startsWith("!s1")) {
        message.channel.send("First Year Schedule", {
            files: [
                "./img/First-Year.png"
            ]
        });
    } else if(message.content.toLowerCase().startsWith("!schedule2") || message.content.toLowerCase().startsWith("!s2")) {
        message.channel.send("Second Year Schedule", {
            files: [
                "./img/Second-Year.png"
            ]
        });
    } else if(message.content.toLowerCase().startsWith("!schedule3") || message.content.toLowerCase().startsWith("!s3")) {
        message.channel.send("First Year Schedule", {
            files: [
                "./img/Third-Year.png"
            ]
        });
    } else if(message.content.toLowerCase().startsWith("!schedules") || message.content.toLowerCase().startsWith("!ss")) {
        message.channel.send("All Schedules", {
            files: [
                "./img/First-Year.png",
                "./img/Second-Year.png",
                "./img/Third-Year.png"
                
            ]
        });
    }
    
    /* Messaging Logic that is separate from normal commands */
    // If the message contains 'android'
    if (message.content.toLowerCase().includes('android')) {
        // Send "pong" to the same channel
        message.channel.send('R dot ID dot');
    }
    
    
    /* JarrodNoises Area*/
    messageCount++;
    
    if(messageCount == restartCount) {
        
        message.channel.send("You've got to be kidding me!"); // Send a message after every 5th message after .5 seconds
        messageCount = 0;
        restartCount = Math.floor(Math.random() * 25) + 5;
        console.log("messages until next JarrodNoise: " + restartCount);
        
    }
    
    
    
});

// Using this for reminders to prevent the need for constant date checks.
// This way the bot will check whenever a users status changes, which will happen often enough to work.
client.on("presenceUpdate", function(oldPresence, newPresence) {
    
    // Get the current date
    //var d1 = new Date();
    //console.log(d1);
    
//*** Setting Reminder
    // enter command
    // bot writes date to file along with message (without overwriting existing reminders)
    // file is saved to server(local)
    // bot unloads all existing file data from memory
        // This is so that the next time the bot checks, it will reload all the information in the file
        // specically, the data it would be missing is the latest reminder
    
    
//*** Outputting Reminder
    // check to see if file data has already been loaded
        // if file data has not been loaded
            // read date from file
        // otherwise
            // do not read file data again
    // presenceUpdate event occurs when users status changes(online -> offline, online -> away, etc)
    // this method will check if it is currently after noon. If it is
        // it will
            // compare date against current date
            // if date difference is less than 1, 
            // output a reminder to the server
            // set a variable to indicate reminders have been triggered for today(variable 'afternoon')
        // otherwise it will
            // set the variable for 'afternoon' to false
            // nothing else
    
    // This means reminders will trigger at or after 12PM(noon) on the day the reminder is set for.
    // The potential to add time exists, however that would increase the complexity of the command required to set reminders.
    // The goal is to keep this as simple as possible for the time being.
    
    
    
    
    // Only needed if we want to see who's status changed, however this is not really necessary.
	//console.log(oldPresence.user.username + " was " + oldPresence.presence.status);
	//console.log(newPresence.user.username + " is " + newPresence.presence.status + "\n");
    
});


// Respond to the bot disconnecting
client.on("disconnect", () => {
    console.log("Bot disconnected!");
    client.login(token);
});


/* Function Declarations */


/* Log In */
// Log our bot in
client.login(token);