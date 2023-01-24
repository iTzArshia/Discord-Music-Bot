const Discord = require('discord.js');
const func = require('../../utils/functions');
const config = require('../../config.json');

module.exports = {
  name: "volume",
  aliases: ["v", "set", "set-volume"],
  description: "Sets the player volume",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const volume = parseInt(args[0]);
    if (isNaN(volume)) {

      const notValidNumberEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription("Please enter a valid number.");

      return message.reply({ embeds: [notValidNumberEmbed] });

    };

    await queue.setVolume(volume);

    const volumeEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription(`Volume changed to \`${volume}\`\n\n${func.queueStatus(queue)}`);

    return message.reply({ embeds: [volumeEmbed] });

  },

};