const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Resume",
  aliases: ["unpause"],
  description: "Resumes the current song",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    if (!queue.paused) {

      const pauseEmbed = new Discord.EmbedBuilder()
        .setColor(config.mainColor)
        .setDescription("Queue isn't paused.");

      return await message.reply({ embeds: [pauseEmbed] });

    };

    await queue.resume()

    const pauseEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription("Resumed the song for you.");

    return await message.reply({ embeds: [pauseEmbed] });

  },

};