const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Resume",
  aliases: ["r", "unpause"],
  description: "Resumes the current song",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    if (queue.playing) {

      const pauseEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription("Queue isn't paused.");

      return await message.reply({ embeds: [pauseEmbed] });

    };

    try {

      await queue.resume();

      const pauseEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription("Resumed the song for you.");

      return await message.reply({ embeds: [pauseEmbed] });

    } catch (error) {

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.ErrorColor)
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message);

      return await message.reply({ embeds: [errorEmbed] });

    };

  },

};