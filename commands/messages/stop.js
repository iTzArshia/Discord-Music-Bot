const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Stop",
  description: "Stops the queue",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    try {

      await queue.stop();

      const stopEmbed = new Discord.EmbedBuilder()
        .setColor(config.mainColor)
        .setDescription("Stopped playing.");

      return await message.reply({ embeds: [stopEmbed] });

    } catch (error) {

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message);

      return await message.reply({ embeds: [errorEmbed] });

    };

  },

};