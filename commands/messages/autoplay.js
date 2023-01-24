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
      .setTitle('Auto Play Stats')
      .setDescription(`**Auto Play:** \`${autoPlayState ? 'ON' : 'OFF'}\``);

    return message.reply({ embeds: [autoplayEmbed] });

  },

};