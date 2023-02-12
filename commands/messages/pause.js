const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Pause",
  aliases: ["Hold"],
  description: "Pauses the current song.",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    if (queue.paused) {

      const pauseEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription("Queue is already paused.")
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [pauseEmbed] });

    };

    try {

      await queue.pause()

      const pauseEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription("Paused the song for you.")
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [pauseEmbed] });

    } catch (error) {

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.ErrorColor)
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message)
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [errorEmbed] });

    };

  },

};