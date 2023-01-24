const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Leave",
  aliases: ["l", "left", "disconnect"],
  description: "Leaves from your Voice Channel",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: false,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    await client.distube.voices.leave(message.guild);

    const leaveEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription('I\'ve disconnected from your Voice Channel.');

    return message.reply({ embeds: [leaveEmbed] });

  },

};