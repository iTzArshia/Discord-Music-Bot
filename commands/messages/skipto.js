const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "SkipTo",
  aliases: ["ST", "Jump"],
  description: "Skips to the provided song id in the queue.",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: true,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    if (!args[0] || isNaN(Number(args[0]))) {

      const noArgsEmbed = new Discord.EmbedBuilder()
        .setColor(config.ErrorColor)
        .setDescription('Please enter a valid number.')
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [noArgsEmbed] });

    };

    try {

      await client.distube.jump(message.guild, Number(args[0])).then(async song => {

        const skippedEmbed = new Discord.EmbedBuilder()
          .setColor(config.MainColor)
          .setDescription(`Skipped to the **${args[0]}. [${song.name} (${song.formattedDuration})](${song.url})**`)
          .setFooter({
            text: `Commanded by ${message.author.tag}`,
            iconURL: message.author.displayAvatarURL({ size: 1024 })
          });

        return await message.reply({ embeds: [skippedEmbed] });

      });

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