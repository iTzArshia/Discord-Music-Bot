const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Previous",
  aliases: ["b", "back"],
  description: "Plays previous song",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    try {

      await queue.previous();

      const skippedEmbed = new Discord.EmbedBuilder()
        .setColor(config.mainColor)
        .setDescription("Skipping to the previus song.");

      return await message.reply({ embeds: [skippedEmbed] });

    } catch (error) {

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message);

      return await message.reply({ embeds: [errorEmbed] });

    };

  },

};