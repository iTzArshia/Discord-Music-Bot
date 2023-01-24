const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "Play",
  aliases: ["p"],
  description: "Plays music for you",

  async execute(client, message, args, cmd) {

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {

      const inVoiceEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('You must be in a Voice Channel.');

      return message.reply({ embeds: [inVoiceEmbed] });

    };

    const string = args.join(' ');
    if (!string) {

      const stringEmbed = new Discord.EmbedBuilder()
        .setColor(config.errorColor)
        .setDescription('Please enter a song url or query to search.');

      return message.reply({ embeds: [stringEmbed] });

    };

    await client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    });

  },

};