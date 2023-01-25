const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "autoplay",
  aliases: ["a", "ap", "auto"],
  description: "Toggles auto play",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    try {

      const autoPlayState = await queue.toggleAutoplay();

      const autoplayEmbed = new Discord.EmbedBuilder()
        .setColor(config.mainColor)
        .setDescription(`Auto Play mode changed to \`${autoPlayState ? "ON" : "OFF"}\`\n\n${func.queueStatus(queue)}`);

      return await message.reply({ embeds: [autoplayEmbed] });

    } catch (error) {

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message);

      return await message.reply({ embeds: [errorEmbed] });

    };

  },

};