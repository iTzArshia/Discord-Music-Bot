const Discord = require('discord.js');
const func = require('../../utils/functions');
const config = require('../../config.json');

module.exports = {
  name: "volume",
  aliases: ["V", "Vol", "Set", "SetVolume"],
  description: "Sets the player volume.",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const volume = parseInt(args[0]);
    if (isNaN(volume)) {

      const notValidNumberEmbed = new Discord.EmbedBuilder()
        .setColor(config.ErrorColor)
        .setDescription("Please enter a valid number.")
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [notValidNumberEmbed] });

    };

    try {

      await queue.setVolume(volume);

      const volumeEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription(`Volume changed to \`${volume}\`\n\n${func.queueStatus(queue)}`)
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [volumeEmbed] });

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