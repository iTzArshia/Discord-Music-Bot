const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "autoplay",
  aliases: ["ap", "auto"],
  description: "Toggles auto play",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: false,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const autoPlayState = await queue.toggleAutoplay();

    const autoplayEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription(`Auto Play mode changed to \`${autoPlayState ? "ON" : "OFF"}\``);

    return message.reply({ embeds: [autoplayEmbed] });

  },

};