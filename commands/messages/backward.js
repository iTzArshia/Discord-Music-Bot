const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "BackWard",
  aliases: ["BW", "Rewind"],
  description: "Backwards the playing song.",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    const time = Number(args[0]);

    if (!args[0] || isNaN(time)) {

      const noArgsEmbed = new Discord.EmbedBuilder()
        .setColor(config.ErrorColor)
        .setDescription('Please provide time (in seconds) to go backward!\n**Example:** `10` for 10 seconds backward.')
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [noArgsEmbed] });

    };

    try {

      await queue.seek(queue.currentTime - time);

      const seekEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription(`Backwarded the song for ${time} seconds.`)
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [seekEmbed] });

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