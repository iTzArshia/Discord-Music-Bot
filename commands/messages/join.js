const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Join",
  aliases: ["J","C", "Connect"],
  description: "Joins to your current Voice Channel.",
  memberVoice: true,
  botVoice: false,
  sameVoice: true,
  queueNeeded: false,

  async execute(client, message, args, cmd, memberVC, botVC, queue) {

    if ((memberVC && botVC) && memberVC.id === botVC.id) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.ErrorColor)
        .setDescription("I\'m already connected to your Voice Channel.")
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [inVoiceEmbed] });

    };

    try {

      await client.distube.voices.join(memberVC);

      const joinEmbed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setDescription("I\'ve connected to your Voice Channel.")
        .setFooter({
          text: `Commanded by ${message.author.tag}`,
          iconURL: message.author.displayAvatarURL({ size: 1024 })
        });

      return await message.reply({ embeds: [joinEmbed] });

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