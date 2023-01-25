const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "shuffle",
  description: "Shuffles the queue song",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    try {

      await queue.shuffle();

      const shuffleEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription("Shuffled songs in the queue");

      return await message.reply({ embeds: [shuffleEmbed] });

    } catch (error) {

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.ErrorColor)
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message);

      return await message.reply({ embeds: [errorEmbed] });

    };

  },

};