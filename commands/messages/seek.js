const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Seek",
  aliases: ["goto"],
  description: "-",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    if (!args[0] || isNaN(Number(args[0]))) {

      const noArgsEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('Please provide position (in seconds) to seek!\n**Example:** `10` for 10th second of song.');

      return message.reply({ embeds: [noArgsEmbed] });

    };

    await queue.seek(Number(args[0]));

    const seekEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription(`Seeked to ${Number(args[0])} seconds.`);

    return message.reply({ embeds: [seekEmbed] });

  },

};