const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Pause",
  aliases: ["hold"],
  description: "Pauses the current song",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    if (queue.paused) {

      const pauseEmbed = new Discord.EmbedBuilder()
        .setColor(config.mainColor)
        .setDescription("Queue is already paused.");

      return await message.reply({ embeds: [pauseEmbed] });

    };

    await queue.pause()

    const pauseEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription("Paused the song for you.");

    return await message.reply({ embeds: [pauseEmbed] });

  },

};