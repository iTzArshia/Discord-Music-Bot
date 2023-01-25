const Discord = require('discord.js');
const config = require('../../config.json');
const func = require('../../utils/functions');

module.exports = {
  name: "Seek",
  aliases: ["goto"],
  description: "-",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const time = Number(args[0]);

    if (!args[0] || isNaN(time)) {

      const noArgsEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('Please provide position (in seconds) to seek!\n**Example:** `10` for 10th second of song.');

      return await message.reply({ embeds: [noArgsEmbed] });

    };

    try {

      await queue.seek(time);

      const seekEmbed = new Discord.EmbedBuilder()
        .setColor(config.mainColor)
        .setDescription(`Seeked to ${func.suffix(time)} second of the song.`);

      return await message.reply({ embeds: [seekEmbed] });

    } catch (error) {

      const errorEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message);

      return await message.reply({ embeds: [errorEmbed] });

    };

  },

};