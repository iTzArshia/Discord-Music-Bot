const Discord = require('discord.js');
const config = require('../config.json');

module.exports = async (client) => {

  await client.user.setPresence({
    activities: [
      {
        name: `to ${config.prefix}Play`,
        type: Discord.ActivityType.Listening
      }
    ],
    status: 'idle'
  });

  console.log(`${client.user.tag} is online and ready to play music for you!`);

  global.isReady = true;

};