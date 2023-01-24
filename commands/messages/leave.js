const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Leave",
  aliases: ["l", "left", "disconnect"],
  description: "Leaves from your Voice Channel",

  async execute(client, message, args, cmd) {

    const botVoiceChannel = message.guild.members.me.voice.channel;
    if (!botVoiceChannel) {

      const noVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('I\'m not connected to any Voice Channel.');

      return message.reply({ embeds: [noVoiceEmbed] });

    };

    const memberVoiceChannel = message.member.voice.channel;
    if (!memberVoiceChannel || (memberVoiceChannel && memberVoiceChannel.id !== botVoiceChannel.id)) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('You are not in my Voice Channel.');

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    await client.distube.voices.leave(message.guild);

    const leaveEmbed = new Discord.EmbedBuilder()
      .setColor(config.mainColor)
      .setDescription('I\'ve disconnected from your Voice Channel.');

    return message.reply({ embeds: [leaveEmbed] });

  },

};