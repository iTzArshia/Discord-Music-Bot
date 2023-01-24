const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Skip",
  aliases: ["next", "n"],
  description: "Skips the current music",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    try {

      await queue.skip()

      const skippedEmbed = new Discord.EmbedBuilder()
        .setColor(config.mainColor)
        .setDescription("Skipping to the next track...");

      return message.reply({ embeds: [skippedEmbed] });

    } catch (error) {

      console.error(error)

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setTitle("An error encountered")
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message);

      return message.reply({ embeds: [errorEmbed] });

    };

  },

};