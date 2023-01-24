const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Play",
  aliases: ["p"],
  description: "Plays music for you",

  async execute(client, message, args, cmd) {

    const memberVoiceChannel = message.member.voice.channel;
    if (!memberVoiceChannel) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('You must be in a Voice Channel.');

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    const botVoiceChannel = message.guild.members.me.voice.channel;
    if (botVoiceChannel) {

      if (memberVoiceChannel.id === botVoiceChannel.id) {

        const inVoiceEmbed = new Discord.EmbedBuilder()
          .setColor(config.errorColor)
          .setDescription('I\'m already connected to your Voice Channel');

        return message.reply({ embeds: [inVoiceEmbed] });

      } else {

        const inVoiceEmbed = new Discord.EmbedBuilder()
          .setColor(config.errorColor)
          .setDescription('I\'m already connected to another Voice Channel');

        return message.reply({ embeds: [inVoiceEmbed] });

      };

    };

    await client.distube.voices.join(memberVoiceChannel);

    const joinEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription('I\'ve connected to your Voice Channel.');

    return message.reply({ embeds: [joinEmbed] });

  },

};