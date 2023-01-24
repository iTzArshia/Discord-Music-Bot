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

    await queue.shuffle();

    const shuffleEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription("Shuffled songs in the queue");

    return message.reply({ embeds: [shuffleEmbed] });

  },

};