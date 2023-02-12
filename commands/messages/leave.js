const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Leave",
  aliases: ["L", "DC", "Left", "Disconnect"],
  description: "Leaves from your Voice Channel.",
  memberVoice: true,
  botVoice: true,
  sameVoice: true,
  queueNeeded: false,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    try {

      await client.distube.voices.leave(message.guild);

      const leaveEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription("I\'ve disconnected from your Voice Channel.")
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [leaveEmbed] });

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